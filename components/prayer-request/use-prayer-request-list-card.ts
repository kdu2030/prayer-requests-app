import { router } from "expo-router";
import * as React from "react";

import { useDeletePrayerRequestLike } from "../../api/delete-prayer-request-like";
import { usePostPrayerRequestLike } from "../../api/post-prayer-request-like";
import { useApiDataContext } from "../../hooks/use-api-data";
import { useI18N } from "../../hooks/use-i18n";
import {
  PrayerRequestActionCreateRequest,
  PrayerRequestModel,
} from "../../types/prayer-request-types";
import { usePrayerGroupContext } from "../prayer-group/prayer-group-context";
import { useToasterContext } from "../toasters/toaster-context";

export const usePrayerRequestListCard = (
  prayerRequest: PrayerRequestModel,
  prayerRequests: PrayerRequestModel[],
  setPrayerRequests: React.Dispatch<React.SetStateAction<PrayerRequestModel[]>>,
) => {
  const [isLikeLoading, setIsLikeLoading] = React.useState<boolean>(false);
  const { translate } = useI18N();

  const { openToaster } = useToasterContext();

  const { prayerGroupDetails } = usePrayerGroupContext();

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

    const updatedPrayerRequests = prayerRequests.map((prayerRequest) => {
      if (prayerRequest.prayerRequestId !== prayerRequestId) {
        return prayerRequest;
      }

      return {
        ...prayerRequest,
        userLikeId: response.value.prayerRequestLikeId,
        likeCount: (prayerRequest.likeCount ?? 0) + 1,
      };
    });

    setPrayerRequests(updatedPrayerRequests);
  };

  const removePrayerRequestLike = async (prayerRequestId: number) => {
    const userId = userData?.userId;

    if (!userId || !prayerRequest.userLikeId) {
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

    const updatedPrayerRequests = prayerRequests.map((prayerRequest) => {
      if (prayerRequest.prayerRequestId !== prayerRequestId) {
        return prayerRequest;
      }

      return {
        ...prayerRequest,
        userLikeId: undefined,
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

  const handlePress = () => {
    if (!prayerGroupDetails?.prayerGroupId || !prayerRequest.prayerRequestId) {
      return;
    }

    router.push({
      pathname: "/prayergroup/[id]/prayerrequest/[id]",
      params: {
        id: prayerGroupDetails.prayerGroupId,
        id_1: prayerRequest.prayerRequestId,
      },
    });
  };

  return {
    isLikeLoading,
    onLikePress,
    handlePress,
  };
};
