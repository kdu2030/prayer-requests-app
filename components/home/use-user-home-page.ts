import * as React from "react";

import { useApiDataContext } from "../../hooks/use-api-data";
import { getJoinedPrayerGroups } from "../prayer-group/prayer-group-helpers";
import { useGlobalPrayerRequestsContext } from "../prayer-request/prayer-request-detail-context";

export const useUserHomePage = () => {
  const { userData } = useApiDataContext();
  const [prayerRequestIds, setPrayerRequestIds] = React.useState<number[]>([]);
  const {} = useGlobalPrayerRequestsContext();

  const joinedPrayerGroups = React.useMemo(() => {
    return getJoinedPrayerGroups(userData?.prayerGroups ?? []);
  }, [userData?.prayerGroups]);

  const joinedNoPrayerGroups = joinedPrayerGroups.length === 0;

  return { joinedPrayerGroups, joinedNoPrayerGroups };
};
