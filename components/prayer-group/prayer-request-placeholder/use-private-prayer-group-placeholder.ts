import * as React from "react";
import { usePostJoinRequest } from "../../../api/post-join-request";
import { useApiDataContext } from "../../../hooks/use-api-data";
import { LoadStatus } from "../../../types/api-response-types";
import { JoinStatus } from "../../../constants/prayer-group-constants";

export const usePrivatePrayerGroupPlaceholder = (
  prayerGroupId: number,
  setUserJoinStatus: (joinStatus: JoinStatus) => void
) => {
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
    }
  };
};
