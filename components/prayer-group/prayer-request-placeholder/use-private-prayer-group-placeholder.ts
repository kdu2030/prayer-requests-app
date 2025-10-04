import * as React from "react";
import { usePostJoinRequest } from "../../../api/post-join-request";
import { useApiDataContext } from "../../../hooks/use-api-data";
import { LoadStatus } from "../../../types/api-response-types";
import { JoinStatus } from "../../../constants/prayer-group-constants";
import { useI18N } from "../../../hooks/use-i18n";

export const usePrivatePrayerGroupPlaceholder = (
  prayerGroupId: number,
  setUserJoinStatus: (joinStatus: JoinStatus) => void
) => {
  const { translate } = useI18N();

  const [submitRequestLoadStatus, setSubmitRequestLoadStatus] =
    React.useState<LoadStatus>(LoadStatus.NotStarted);

  const [successMessage, setSuccessMessage] = React.useState<
    string | undefined
  >();
  const [errorMessage, setErrorMessage] = React.useState<string | undefined>();

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
      setErrorMessage(translate("toaster.joinRequestSubmit.failure"));
    }

    setSubmitRequestLoadStatus(LoadStatus.Success);
    setSuccessMessage(translate("toaster.joinRequestSubmit.success"));

    setUserJoinStatus(JoinStatus.RequestSubmitted);
  };

  return {
    submitRequestLoadStatus,
    onSubmitJoinRequest,
    errorMessage,
    successMessage,
    setErrorMessage,
    setSuccessMessage,
  };
};
