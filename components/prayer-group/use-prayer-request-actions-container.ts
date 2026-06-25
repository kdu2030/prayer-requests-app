import * as React from "react";

import { PrayerRequestModel } from "../../types/prayer-request-types";

export const usePrayerRequestActionsContainer = () => {
  const [isPrayerRequestActionsOpen, setIsPrayerRequestActionsOpen] =
    React.useState<boolean>(false);

  const [showExtendedActions, setShowExtendedActions] =
    React.useState<boolean>(false);

  const [selectedPrayerRequest, setSelectedPrayerRequest] = React.useState<
    PrayerRequestModel | undefined
  >();

  const [isExpirationModalOpen, setIsExpirationModalOpen] =
    React.useState<boolean>(false);

  const [expirationModalPrayerRequest, setExpirationModalPrayerRequest] =
    React.useState<PrayerRequestModel | undefined>();

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

  const onExpirationDateModalOpen = () => {
    if (!selectedPrayerRequest) {
      return;
    }

    setIsExpirationModalOpen(true);
    setExpirationModalPrayerRequest(selectedPrayerRequest);
    closePrayerRequestActions();
  };

  const onExpirationDateModalClose = () => {
    setIsExpirationModalOpen(false);
    setExpirationModalPrayerRequest(undefined);
  };

  return {
    selectedPrayerRequest,
    openPrayerRequestActions,
    closePrayerRequestActions,
    setSelectedPrayerRequest,
    showExtendedActions,
    isPrayerRequestActionsOpen,
    isExpirationModalOpen,
    onExpirationDateModalOpen,
    onExpirationDateModalClose,
    expirationModalPrayerRequest,
  };
};
