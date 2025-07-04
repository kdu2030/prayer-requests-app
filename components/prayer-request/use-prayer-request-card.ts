import * as React from "react";

import { PrayerRequestModel } from "../../types/prayer-request-types";

export const usePrayerRequestCard = (
  prayerRequest: PrayerRequestModel,
  updatePrayerRequestLikes: (
    prayerRequestId: number,
    addLike: boolean
  ) => Promise<void>
) => {
  const [isLikeLoading, setIsLikeLoading] = React.useState<boolean>(false);

  const onLikePress = async () => {
    if (!prayerRequest.prayerRequestId) {
      return;
    }

    setIsLikeLoading(true);
    await updatePrayerRequestLikes(
      prayerRequest.prayerRequestId,
      !prayerRequest.isUserLiked
    );
    setIsLikeLoading(false);
  };

  return {
    isLikeLoading,
    onLikePress,
  };
};
