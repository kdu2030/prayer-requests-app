import * as React from "react";

import { PrayerRequestModel } from "../../types/prayer-request-types";
import { useGlobalPrayerRequestsContext } from "./global-prayer-requests-context";
import { PrayerRequestCard } from "./prayer-request-card";
import { usePrayerRequestListCard } from "./use-prayer-request-list-card";

type Props = {
  prayerRequestId: number;
  openPrayerRequestActions: (
    prayerRequest: PrayerRequestModel,
    showExtendedOptions?: boolean,
  ) => void;
  showCreatedUser?: boolean;
};

export const PrayerRequestListCard: React.FC<Props> = ({
  prayerRequestId,
  showCreatedUser = true,
  openPrayerRequestActions,
}) => {
  const { getPrayerRequestFromStore: getPrayerRequest } =
    useGlobalPrayerRequestsContext();

  const prayerRequest = getPrayerRequest(prayerRequestId);
  const { isLikeLoading, onLikePress, onCommentPress } =
    usePrayerRequestListCard(prayerRequest);

  if (!prayerRequest) {
    return;
  }

  return (
    <PrayerRequestCard
      prayerRequest={prayerRequest}
      onOpenMenu={() => openPrayerRequestActions(prayerRequest, true)}
      isLikeLoading={isLikeLoading}
      onLikePress={onLikePress}
      onPrayPress={() => openPrayerRequestActions(prayerRequest, false)}
      onCommentPress={onCommentPress}
      showCreatedUser={showCreatedUser}
    />
  );
};
