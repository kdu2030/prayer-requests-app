import { router } from "expo-router";
import { setNestedObjectValues, useFormikContext } from "formik";
import { isEmpty } from "lodash";
import * as React from "react";

import { usePostPrayerRequest } from "../../../../api/post-prayer-request";
import { formatDate } from "../../../../helpers/formatting-helpers";
import { useApiDataContext } from "../../../../hooks/use-api-data";
import { useI18N } from "../../../../hooks/use-i18n";
import { mapCreatePrayerRequest } from "../../../../mappers/map-create-prayer-request";
import { DropdownOption } from "../../../../types/inputs/dropdown";
import { CultureCode } from "../../../../types/languages";
import { PrayerRequestFilterCriteria } from "../../../../types/prayer-request-types";
import { usePrayerRequestContext } from "../../../prayer-request/prayer-request-context";
import { useToasterContext } from "../../../toasters/toaster-context";
import { DEFAULT_PRAYER_REQUEST_FILTERS } from "../../prayer-group-constants";
import { usePrayerGroupContext } from "../../prayer-group-context";
import {
  CreatePrayerRequestForm,
  TimeToLiveOption,
} from "../create-prayer-request-types";

export const useExpirationStep = () => {
  const { translate, i18n } = useI18N();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const { openToaster } = useToasterContext();

  const { validateForm, setTouched, setErrors, touched, values } =
    useFormikContext<CreatePrayerRequestForm>();

  const { userData } = useApiDataContext();
  const { prayerGroupDetails } = usePrayerGroupContext();
  const {
    loadNextPrayerRequestsForGroup,
    cleanupPrayerRequests,
    prayerRequestFilters,
  } = usePrayerRequestContext();

  const postPrayerRequest = usePostPrayerRequest();

  const expirationDateOptions: DropdownOption<number>[] = React.useMemo(
    () => [
      {
        label: translate("prayerGroup.request.expirationDate.week", {
          count: 1,
        }),
        value: TimeToLiveOption.OneWeek,
      },
      {
        label: translate("prayerGroup.request.expirationDate.weeks", {
          count: 2,
        }),
        value: TimeToLiveOption.TwoWeeks,
      },
      {
        label: translate("prayerGroup.request.expirationDate.weeks", {
          count: 3,
        }),
        value: TimeToLiveOption.ThreeWeeks,
      },
    ],
    [translate],
  );

  const expirationDate = React.useMemo(() => {
    if (!values.timeToLive) {
      return;
    }

    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + values.timeToLive);

    return formatDate(
      expirationDate.toISOString(),
      i18n.language as CultureCode,
    );
  }, [i18n.language, values.timeToLive]);

  const refreshPrayerRequests = async (prayerGroupId: number) => {
    const filtersForRefresh: PrayerRequestFilterCriteria = {
      ...DEFAULT_PRAYER_REQUEST_FILTERS,
      sortConfig: prayerRequestFilters.sortConfig,
    };

    cleanupPrayerRequests();
    await loadNextPrayerRequestsForGroup(
      prayerGroupId,
      true,
      filtersForRefresh,
    );
  };

  const onSavePrayerRequest = async () => {
    const errors = await validateForm();
    if (!isEmpty(errors)) {
      setErrors(errors);
      setTouched(setNestedObjectValues({ ...errors, ...touched }, true));
      return;
    }

    if (!userData?.userId || !prayerGroupDetails?.prayerGroupId) {
      return;
    }

    const createPrayerRequestForm = mapCreatePrayerRequest(
      userData.userId,
      prayerGroupDetails.prayerGroupId,
      values,
    );

    setIsLoading(true);
    const response = await postPrayerRequest(createPrayerRequestForm);
    setIsLoading(false);

    if (response.isError) {
      openToaster({
        message: translate("toaster.failed.saveFailure", {
          item: translate("prayerRequest.label"),
        }),
        variant: "error",
      });
      return;
    }

    await refreshPrayerRequests(prayerGroupDetails.prayerGroupId);

    router.replace({
      pathname: "/prayergroup/[id]/prayerrequest/[id]",
      params: {
        id: prayerGroupDetails.prayerGroupId,
        id_1: response.value.prayerRequestId,
      },
    });
  };

  return {
    expirationDateOptions,
    onSavePrayerRequest,
    isLoading,
    expirationDate,
  };
};
