import * as React from "react";

import { PrayerRequestModel } from "../../types/prayer-request-types";

export const usePrayerGroupRequests = () => {
  const [isPrayerRequestActionsOpen, setIsPrayerRequestActionsOpen] =
    React.useState<boolean>(false);

  const [showExtendedActions, setShowExtendedActions] =
    React.useState<boolean>(false);

  const [selectedPrayerRequest, setSelectedPrayerRequest] = React.useState<
    PrayerRequestModel | undefined
  >();

  const openPrayerRequestActions = (
    prayerRequest: PrayerRequestModel,
    showExtended: boolean = false,
  ) => {
    setIsPrayerRequestActionsOpen(true);
    setSelectedPrayerRequest(prayerRequest);
    setShowExtendedActions(showExtended);
  };

  const closePrayerRequestActions = () => {
    setIsPrayerRequestActionsOpen(false);
    setSelectedPrayerRequest(undefined);
    setShowExtendedActions(false);
  };

  return {
    selectedPrayerRequest,
    openPrayerRequestActions,
    closePrayerRequestActions,
    setSelectedPrayerRequest,
    showExtendedActions,
    isPrayerRequestActionsOpen,
  };
};
