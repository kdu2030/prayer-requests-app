import * as React from "react";

import { useGetPrayerRequest } from "../../api/get-prayer-request";
import { usePostPrayerRequestLike } from "../../api/post-prayer-request-like";
import { useApiDataContext } from "../../hooks/use-api-data";
import { useI18N } from "../../hooks/use-i18n";
import { LoadStatus } from "../../types/api-response-types";
import {
  PrayerRequestDetailsModel,
  PrayerRequestModel,
} from "../../types/prayer-request-types";
import { useToasterContext } from "../toasters/toaster-context";
import { usePrayerRequestDetailContext } from "./prayer-request-detail-context";

export const usePrayerRequestPage = (prayerRequestId: number) => {
  const [prayerRequest, setPrayerRequest] =
    React.useState<PrayerRequestDetailsModel>();
  const [prayerRequestLoadStatus, setPrayerRequestLoadStatus] =
    React.useState<LoadStatus>(LoadStatus.NotStarted);

  const [isLikeLoading, setIsLikeLoading] = React.useState<boolean>(false);

  const { userData } = useApiDataContext();
  const { translate } = useI18N();
  const { openToaster } = useToasterContext();

  const getPrayerRequest = useGetPrayerRequest();
  const postPrayerRequestLike = usePostPrayerRequestLike();

  const { setPrayerRequest: setPrayerRequestGlobal } =
    usePrayerRequestDetailContext();

  const loadPrayerRequest = React.useCallback(async () => {
    setPrayerRequestLoadStatus(LoadStatus.Loading);
    const prayerRequestResponse = await getPrayerRequest(prayerRequestId);

    if (prayerRequestResponse.isError) {
      setPrayerRequestLoadStatus(LoadStatus.Error);
      return;
    }

    setPrayerRequest(prayerRequestResponse.value);
    setPrayerRequestGlobal(prayerRequestId, prayerRequestResponse.value);

    setPrayerRequestLoadStatus(LoadStatus.Success);
  }, [getPrayerRequest, prayerRequestId, setPrayerRequestGlobal]);

  React.useEffect(() => {
    loadPrayerRequest();
  }, [loadPrayerRequest]);

  const addPrayerRequestLike = async () => {
    if (!prayerRequest?.prayerRequestId || !userData?.userId) {
      return;
    }

    setIsLikeLoading(true);
    const response = await postPrayerRequestLike(
      prayerRequest.prayerRequestId,
      {
        userId: userData.userId,
        submittedDate: new Date().toISOString(),
      },
    );
    setIsLikeLoading(false);

    if (response.isError) {
      openToaster({
        message: translate("prayerRequest.addLike.failure"),
        variant: "error",
      });
      return;
    }

    const updatedPrayerRequest: PrayerRequestModel = {
      ...prayerRequest,
      likeCount: (prayerRequest.likeCount ?? 0) + 1,
      userLikeId: response.value.prayerRequestLikeId,
    };

    setPrayerRequest(updatedPrayerRequest);
    setPrayerRequestGlobal(prayerRequestId, updatedPrayerRequest);
  };

  const onLikePress = async () => {
    if (!prayerRequest) {
      return;
    }

    if (!prayerRequest.userLikeId) {
      await addPrayerRequestLike();
    }
  };

  return {
    prayerRequest,
    prayerRequestLoadStatus,
    loadPrayerRequest,
    onLikePress,
    isLikeLoading,
  };
};
