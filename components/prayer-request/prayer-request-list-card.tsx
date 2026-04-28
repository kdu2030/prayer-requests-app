import * as React from "react";

import { PrayerRequestModel } from "../../types/prayer-request-types";
import { PrayerRequestCard } from "./prayer-request-card";
import { usePrayerRequestDetailContext } from "./prayer-request-detail-context";
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
    usePrayerRequestDetailContext();

  const prayerRequest = getPrayerRequest(prayerRequestId);
  const { isLikeLoading, onLikePress } =
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
      showCreatedUser={showCreatedUser}
    />
  );
};
