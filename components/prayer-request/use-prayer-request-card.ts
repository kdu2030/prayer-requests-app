import * as React from "react";

import { useDeletePrayerRequestLike } from "../../api/delete-prayer-request-like";
import { usePostPrayerRequestLike } from "../../api/post-prayer-request-like";
import { useApiDataContext } from "../../hooks/use-api-data";
import { useI18N } from "../../hooks/use-i18n";
import { PrayerRequestModel } from "../../types/prayer-request-types";

export const usePrayerRequestCard = (
  prayerRequest: PrayerRequestModel,
  prayerRequests: PrayerRequestModel[],
  setPrayerRequests: React.Dispatch<React.SetStateAction<PrayerRequestModel[]>>,
  setSnackbarError: React.Dispatch<React.SetStateAction<string>>
) => {
  const [isLikeLoading, setIsLikeLoading] = React.useState<boolean>(false);
  const { translate } = useI18N();

  const postPrayerRequestLike = usePostPrayerRequestLike();
  const deletePrayerRequestLike = useDeletePrayerRequestLike();

  const { userData } = useApiDataContext();

  const addPrayerRequestLike = async (prayerRequestId: number) => {
    const userId = userData?.userId;

    if (!userId) {
      return;
    }

    const response = await postPrayerRequestLike(userId, prayerRequestId);

    if (response.isError) {
      setSnackbarError(translate("prayerRequest.addLike.failure"));
      return;
    }

    const updatedPrayerRequests = prayerRequests.map((prayerRequest) => {
      if (prayerRequest.prayerRequestId !== prayerRequestId) {
        return prayerRequest;
      }

      return {
        ...prayerRequest,
        isUserLiked: true,
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

    const response = await deletePrayerRequestLike(prayerRequestId, userId);

    if (response.isError) {
      setSnackbarError(translate("prayerRequest.removeLike.failure"));
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

    if (!prayerRequest.isUserLiked) {
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
    return prayerRequest.isUserLiked ? "heart" : "heart-outline";
  }, [isLikeLoading, prayerRequest.isUserLiked]);

  return {
    isLikeLoading,
    onLikePress,
    likeIcon,
  };
};
