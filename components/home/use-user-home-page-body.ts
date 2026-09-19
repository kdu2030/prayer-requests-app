import * as React from "react";

import { useApiDataContext } from "../../hooks/use-api-data";
import { LoadStatus } from "../../types/api-response-types";
import { PrayerRequestModel } from "../../types/prayer-request-types";
import { getJoinedPrayerGroups } from "../prayer-group/prayer-group-helpers";
import { useGlobalPrayerRequestsContext } from "../prayer-request/global-prayer-requests-context";

export const useUserHomePageBody = () => {
  const { userData } = useApiDataContext();
  const [prayerRequestIds, setPrayerRequestIds] = React.useState<number[]>([]);
  const { getPrayerRequestFromStore } = useGlobalPrayerRequestsContext();

  const [homePageLoadStatus, setHomePageLoadStatus] =
    React.useState<LoadStatus>(LoadStatus.NotStarted);

  const joinedPrayerGroups = React.useMemo(() => {
    return getJoinedPrayerGroups(userData?.prayerGroups ?? []);
  }, [userData?.prayerGroups]);

  const joinedNoPrayerGroups = joinedPrayerGroups.length === 0;

  const loadPrayerRequestsForHomePage = React.useCallback(() => {
    if (joinedPrayerGroups.length === 0) {
      return;
    }

    setHomePageLoadStatus(LoadStatus.Loading);
  }, [joinedPrayerGroups.length]);

  const loadedPrayerRequests = React.useMemo(() => {
    return prayerRequestIds.reduce(
      (prayerRequests: PrayerRequestModel[], prayerRequestId) => {
        const prayerRequest = getPrayerRequestFromStore(prayerRequestId);
        if (!prayerRequest) {
          return prayerRequests;
        }

        prayerRequests.push(prayerRequest);
        return prayerRequests;
      },
      [],
    );
  }, [getPrayerRequestFromStore, prayerRequestIds]);

  return {
    homePageLoadStatus,
    joinedPrayerGroups,
    joinedNoPrayerGroups,
    loadedPrayerRequests,
    setPrayerRequestIds,
    loadPrayerRequestsForHomePage,
  };
};
