import * as React from "react";

import { useGetPrayerRequest } from "../../api/get-prayer-request";
import { usePostPrayerRequestLike } from "../../api/post-prayer-request-like";
import { useApiDataContext } from "../../hooks/use-api-data";
import { useI18N } from "../../hooks/use-i18n";
import { LoadStatus } from "../../types/api-response-types";
import { PrayerRequestModel } from "../../types/prayer-request-types";
import { useToasterContext } from "../toasters/toaster-context";
import {
  PrayerRequestContextType,
  usePrayerRequestContext,
} from "./prayer-request-context";
import { PrayerRequestEntryPoint } from "./prayer-request-types";

export const usePrayerRequestPage = (
  prayerRequestId: number,
  entryPoint: PrayerRequestEntryPoint,
) => {
  const [prayerRequest, setPrayerRequest] =
    React.useState<PrayerRequestModel>();
  const [prayerRequestLoadStatus, setPrayerRequestLoadStatus] =
    React.useState<LoadStatus>(LoadStatus.NotStarted);

  const [isLikeLoading, setIsLikeLoading] = React.useState<boolean>(false);

  const { userData } = useApiDataContext();
  const { translate } = useI18N();
  const { openToaster } = useToasterContext();

  const getPrayerRequest = useGetPrayerRequest();
  const postPrayerRequestLike = usePostPrayerRequestLike();

  // This can be undefined because the last page visited might not be a prayer group
  const prayerRequestContext: PrayerRequestContextType | undefined =
    usePrayerRequestContext();

  const loadPrayerRequest = React.useCallback(async () => {
    setPrayerRequestLoadStatus(LoadStatus.Loading);
    const prayerRequestResponse = await getPrayerRequest(prayerRequestId);

    if (prayerRequestResponse.isError) {
      setPrayerRequestLoadStatus(LoadStatus.Error);
      return;
    }

    setPrayerRequest(prayerRequestResponse.value);
    setPrayerRequestLoadStatus(LoadStatus.Success);
  }, [getPrayerRequest, prayerRequestId]);

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

    if (
      entryPoint === PrayerRequestEntryPoint.PrayerGroup &&
      prayerRequestContext
    ) {
      const { prayerRequests, setPrayerRequests } = prayerRequestContext;

      const updatedPrayerRequests = prayerRequests.map((groupPrayerRequest) => {
        if (groupPrayerRequest.prayerRequestId !== prayerRequestId) {
          return groupPrayerRequest;
        }

        return {
          ...groupPrayerRequest,
          userLikeId: updatedPrayerRequest.userLikeId,
          likeCount: updatedPrayerRequest.likeCount,
        };
      });

      setPrayerRequests(updatedPrayerRequests);
    }
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
