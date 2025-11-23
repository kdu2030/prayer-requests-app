import * as React from "react";

import { usePostJoinRequest } from "../../../api/post-join-request";
import { JoinStatus } from "../../../constants/prayer-group-constants";
import { useApiDataContext } from "../../../hooks/use-api-data";
import { useI18N } from "../../../hooks/use-i18n";
import { LoadStatus } from "../../../types/api-response-types";
import { useToasterContext } from "../../toasters/toaster-context";

export const usePrivatePrayerGroupPlaceholder = (
  prayerGroupId: number,
  setUserJoinStatus: (joinStatus: JoinStatus) => void
) => {
  const { translate } = useI18N();
  const { openToaster } = useToasterContext();

  const [submitRequestLoadStatus, setSubmitRequestLoadStatus] =
    React.useState<LoadStatus>(LoadStatus.NotStarted);

  const postJoinRequest = usePostJoinRequest();
  const { userData } = useApiDataContext();

  const onSubmitJoinRequest = async () => {
    if (!userData?.userId) {
      return;
    }

    setSubmitRequestLoadStatus(LoadStatus.Loading);
    const response = await postJoinRequest(prayerGroupId, userData.userId);

    if (response.isError) {
      setSubmitRequestLoadStatus(LoadStatus.Error);
      openToaster({
        message: translate("toaster.joinRequestSubmit.failure"),
        variant: "error",
      });
      return;
    }

    setSubmitRequestLoadStatus(LoadStatus.Success);
    openToaster({
      message: translate("toaster.joinRequestSubmit.success"),
      variant: "success",
    });

    setUserJoinStatus(JoinStatus.RequestSubmitted);
  };

  return {
    submitRequestLoadStatus,
    onSubmitJoinRequest,
  };
};
