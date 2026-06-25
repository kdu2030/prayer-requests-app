import * as React from "react";

import {
  PutPrayerRequestBody,
  usePutPrayerRequest,
} from "../../api/put-prayer-request";
import { formatDate } from "../../helpers/formatting-helpers";
import { useI18N } from "../../hooks/use-i18n";
import { DropdownOption } from "../../types/inputs/dropdown";
import { CultureCode } from "../../types/languages";
import { PrayerRequestModel } from "../../types/prayer-request-types";
import { TimeToLiveOption } from "../prayer-group/create-prayer-request/create-prayer-request-types";
import { useToasterContext } from "../toasters/toaster-context";
import { usePrayerRequestDetailContext } from "./prayer-request-detail-context";
import { EditExpirationDateForm } from "./prayer-request-types";

export function useEditExpirationDateModal(
  prayerRequest: PrayerRequestModel | undefined,
  onClose: () => void,
) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const { setPrayerRequest } = usePrayerRequestDetailContext();

  const { translate, i18n } = useI18N();
  const putPrayerRequest = usePutPrayerRequest();

  const { openToaster } = useToasterContext();

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

  function getUpdatedExpirationDate(
    values: EditExpirationDateForm,
  ): Date | undefined {
    if (!prayerRequest?.expirationDate) {
      return undefined;
    }

    const additionalDays = values.timeToLive ?? 0;
    const updatedExpirationDate = new Date(prayerRequest.expirationDate);

    updatedExpirationDate.setDate(
      updatedExpirationDate.getDate() + additionalDays,
    );

    return updatedExpirationDate;
  }

  function getFormattedExpirationDate(values: EditExpirationDateForm): string {
    const updatedExpirationDate = getUpdatedExpirationDate(values);

    return updatedExpirationDate
      ? formatDate(
          updatedExpirationDate.toISOString(),
          i18n.language as CultureCode,
        )
      : "";
  }

  async function onSave(values: EditExpirationDateForm) {
    const updatedExpirationDate = getUpdatedExpirationDate(values);

    if (!updatedExpirationDate) {
      onClose();
      return;
    }

    if (!prayerRequest?.prayerRequestId) {
      return;
    }

    const requestBody: PutPrayerRequestBody = {
      ...prayerRequest,
      expirationDate: updatedExpirationDate.toISOString(),
    };

    setIsLoading(true);

    const response = await putPrayerRequest(
      prayerRequest.prayerRequestId,
      requestBody,
    );

    setIsLoading(false);

    if (response.isError) {
      openToaster({
        variant: "error",
        message: translate("toaster.editExpirationDate.failure"),
      });
      return;
    }

    openToaster({
      variant: "success",
      message: translate("toaster.editExpirationDate.success"),
    });

    if (response.value.prayerRequestId) {
      setPrayerRequest(response.value.prayerRequestId, response.value);
    }

    onClose();
  }

  return {
    expirationDateOptions,
    getUpdatedExpirationDate,
    getFormattedExpirationDate,
    onSave,
    isLoading,
  };
}
