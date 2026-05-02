import { router } from "expo-router";
import * as React from "react";

import { PrayerRequestModel } from "../../types/prayer-request-types";
import { usePrayerGroupContext } from "./prayer-group-context";

export const usePrayerGroupRequests = () => {
  const [isPrayerRequestActionsOpen, setIsPrayerRequestActionsOpen] =
    React.useState<boolean>(false);

  const [showExtendedActions, setShowExtendedActions] =
    React.useState<boolean>(false);

  const [selectedPrayerRequest, setSelectedPrayerRequest] = React.useState<
    PrayerRequestModel | undefined
  >();

  const { prayerGroupDetails } = usePrayerGroupContext();

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

  const navigateToPrayerRequestPage = (prayerRequestId: number) => {
    if (!prayerGroupDetails?.prayerGroupId) {
      return;
    }

    router.push({
      pathname: "/prayergroup/[id]/prayerrequest/[id]",
      params: {
        id: prayerGroupDetails.prayerGroupId,
        id_1: prayerRequestId,
      },
    });
  };

  return {
    selectedPrayerRequest,
    openPrayerRequestActions,
    closePrayerRequestActions,
    setSelectedPrayerRequest,
    showExtendedActions,
    navigateToPrayerRequestPage,
    isPrayerRequestActionsOpen,
  };
};
