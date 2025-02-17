import * as React from "react";

import { useGetPrayerGroup } from "../../api/get-prayer-group";
import { mapPrayerGroupDetails } from "../../mappers/map-prayer-group";
import { PrayerGroupDetails } from "../../types/prayer-group-types";

export const usePrayerGroup = (prayerGroupId: number) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [prayerGroupDetails, setPrayerGroupDetails] =
    React.useState<PrayerGroupDetails>();

  const getPrayerGroup = useGetPrayerGroup();

  const loadPrayerGroup = React.useCallback(async () => {
    setPrayerGroupDetails(undefined);
    setIsLoading(true);

    // Adds a delay so prayer group rendering doesn't slow down drawer
    await new Promise<void>((resolve) => setTimeout(resolve, 100));

    const response = await getPrayerGroup(prayerGroupId);
    setIsLoading(false);

    if (response.isError) {
      // TODO: Figure out how to handle this
      return;
    }

    const loadedPrayerGroupDetails = mapPrayerGroupDetails(response.value);
    setPrayerGroupDetails(loadedPrayerGroupDetails);
  }, [getPrayerGroup, prayerGroupId]);

  React.useEffect(() => {
    loadPrayerGroup();
  }, [loadPrayerGroup]);

  return {
    isLoading,
    setIsLoading,
    prayerGroupDetails,
  };
};
