import * as React from "react";

import { useDeletePrayerRequestLike } from "../../api/delete-prayer-request-like";
import { usePostPrayerRequestLike } from "../../api/post-prayer-request-like";
import { useApiDataContext } from "../../hooks/use-api-data";
import { useI18N } from "../../hooks/use-i18n";
import {
  PrayerRequestActionCreateRequest,
  PrayerRequestModel,
} from "../../types/prayer-request-types";
import { useToasterContext } from "../toasters/toaster-context";
import { usePrayerRequestDetailContext } from "./prayer-request-detail-context";

export const usePrayerRequestListCard = (
  prayerRequest: PrayerRequestModel | undefined,
) => {
  const [isLikeLoading, setIsLikeLoading] = React.useState<boolean>(false);
  const { translate } = useI18N();

  const { openToaster } = useToasterContext();

  const postPrayerRequestLike = usePostPrayerRequestLike();
  const deletePrayerRequestLike = useDeletePrayerRequestLike();

  const { userData } = useApiDataContext();

  const { setPrayerRequest } = usePrayerRequestDetailContext();

  const addPrayerRequestLike = async (prayerRequestId: number) => {
    const userId = userData?.userId;

    if (!userId || !prayerRequest) {
      return;
    }

    const createRequest: PrayerRequestActionCreateRequest = {
      userId,
      submittedDate: new Date().toISOString(),
    };

    const response = await postPrayerRequestLike(
      prayerRequestId,
      createRequest,
    );

    if (response.isError) {
      openToaster({
        message: translate("prayerRequest.addLike.failure"),
        variant: "error",
      });
      return;
    }

    setPrayerRequest(prayerRequestId, {
      ...prayerRequest,
      userLikeId: response.value.prayerRequestLikeId,
      likeCount: (prayerRequest.likeCount ?? 0) + 1,
    });
  };

  const removePrayerRequestLike = async (prayerRequestId: number) => {
    const userId = userData?.userId;

    if (!userId || !prayerRequest?.userLikeId) {
      return;
    }

    const response = await deletePrayerRequestLike(prayerRequest.userLikeId);

    if (response.isError) {
      openToaster({
        message: translate("prayerRequest.removeLike.failure"),
        variant: "error",
      });
      return;
    }

    setPrayerRequest(prayerRequestId, {
      ...prayerRequest,
      userLikeId: undefined,
      likeCount: prayerRequest.likeCount ? prayerRequest.likeCount - 1 : 0,
    });
  };

  const onLikePress = async () => {
    if (!prayerRequest?.prayerRequestId) {
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

  return {
    isLikeLoading,
    onLikePress,
  };
};
