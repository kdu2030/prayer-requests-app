import * as React from "react";

import { PrayerRequestModel } from "../../types/prayer-request-types";
import { PrayerRequestCard } from "./prayer-request-card";
import { usePrayerRequestListCard } from "./use-prayer-request-list-card";

type Props = {
  prayerRequest: PrayerRequestModel;
  prayerRequests: PrayerRequestModel[];
  setPrayerRequests: React.Dispatch<React.SetStateAction<PrayerRequestModel[]>>;
  openPrayerRequestActions: (
    prayerRequest: PrayerRequestModel,
    showExtendedOptions?: boolean,
  ) => void;
  showCreatedUser?: boolean;
};

export const PrayerRequestListCard: React.FC<Props> = ({
  prayerRequest,
  prayerRequests,
  setPrayerRequests,
  showCreatedUser = true,
  openPrayerRequestActions,
}) => {
  const { isLikeLoading, onLikePress } = usePrayerRequestListCard(
    prayerRequest,
    prayerRequests,
    setPrayerRequests,
  );

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
