import * as React from "react";

import { useDeletePrayerRequestLike } from "../../api/delete-prayer-request-like";
import { usePostPrayerRequestLike } from "../../api/post-prayer-request-like";
import { useApiDataContext } from "../../hooks/use-api-data";
import { useI18N } from "../../hooks/use-i18n";
import { PrayerRequestModel } from "../../types/prayer-request-types";
import { useToasterContext } from "../toasters/toaster-context";
import { PrayerRequestActionCreateRequest } from "./prayer-request-types";

export const usePrayerRequestCard = (
  prayerRequest: PrayerRequestModel,
  prayerRequests: PrayerRequestModel[],
  setPrayerRequests: React.Dispatch<React.SetStateAction<PrayerRequestModel[]>>,
) => {
  const [isLikeLoading, setIsLikeLoading] = React.useState<boolean>(false);
  const { translate } = useI18N();

  const { openToaster } = useToasterContext();

  const postPrayerRequestLike = usePostPrayerRequestLike();
  const deletePrayerRequestLike = useDeletePrayerRequestLike();

  const { userData } = useApiDataContext();

  const addPrayerRequestLike = async (prayerRequestId: number) => {
    const userId = userData?.userId;

    if (!userId) {
      return;
    }

    const createRequest: PrayerRequestActionCreateRequest = {
      userId,
      submittedDate: new Date().toISOString(),
    };

    const response = await postPrayerRequestLike(userId, createRequest);

    if (response.isError) {
      openToaster({
        message: translate("prayerRequest.addLike.failure"),
        variant: "error",
      });
      return;
    }

    const updatedPrayerRequests = prayerRequests.map((prayerRequest) => {
      if (prayerRequest.prayerRequestId !== prayerRequestId) {
        return prayerRequest;
      }

      return {
        ...prayerRequest,
        userLikeId: response.value.prayerRequestId,
        likeCount: (prayerRequest.likeCount ?? 0) + 1,
      };
    });

    setPrayerRequests(updatedPrayerRequests);
  };

  const removePrayerRequestLike = async (prayerRequestId: number) => {
    const userId = userData?.userId;

    if (!userId) {
      return;
    }

    const response = await deletePrayerRequestLike(userId, prayerRequestId);

    if (response.isError) {
      openToaster({
        message: translate("prayerRequest.removeLike.failure"),
        variant: "error",
      });
      return;
    }

    const updatedPrayerRequests = prayerRequests.map((prayerRequest) => {
      if (prayerRequest.prayerRequestId !== prayerRequestId) {
        return prayerRequest;
      }

      return {
        ...prayerRequest,
        isUserLiked: false,
        likeCount: prayerRequest.likeCount ? prayerRequest.likeCount - 1 : 0,
      };
    });

    setPrayerRequests(updatedPrayerRequests);
  };

  const onLikePress = async () => {
    if (!prayerRequest.prayerRequestId) {
      return;
    }

    setIsLikeLoading(true);

    if (!prayerRequest.userLikeId) {
      await addPrayerRequestLike(prayerRequest.prayerRequestId);
    } else {
      await removePrayerRequestLike(prayerRequest.prayerRequestId);
    }

    setIsLikeLoading(false);
  };

  const likeIcon = React.useMemo(() => {
    if (isLikeLoading) {
      return undefined;
    }
    return prayerRequest.userLikeId ? "heart" : "heart-outline";
  }, [isLikeLoading, prayerRequest.userLikeId]);

  return {
    isLikeLoading,
    onLikePress,
    likeIcon,
  };
};
