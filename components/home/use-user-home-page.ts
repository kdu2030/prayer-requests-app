import * as React from "react";

import { useApiDataContext } from "../../hooks/use-api-data";
import { PrayerRequestModel } from "../../types/prayer-request-types";
import { getJoinedPrayerGroups } from "../prayer-group/prayer-group-helpers";
import { useGlobalPrayerRequestsContext } from "../prayer-request/global-prayer-requests-context";

export const useUserHomePage = () => {
  const { userData } = useApiDataContext();
  const [prayerRequestIds, setPrayerRequestIds] = React.useState<number[]>([]);
  const { getPrayerRequestFromStore } = useGlobalPrayerRequestsContext();

  const joinedPrayerGroups = React.useMemo(() => {
    return getJoinedPrayerGroups(userData?.prayerGroups ?? []);
  }, [userData?.prayerGroups]);

  const joinedNoPrayerGroups = joinedPrayerGroups.length === 0;

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
    joinedPrayerGroups,
    joinedNoPrayerGroups,
    loadedPrayerRequests,
    setPrayerRequestIds,
  };
};
