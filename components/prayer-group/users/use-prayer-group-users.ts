import * as React from "react";

import { useGetPrayerGroupUsers } from "../../../api/get-prayer-group-users";
import { PrayerGroupRole } from "../../../constants/prayer-group-constants";
import { mapPrayerGroupUser } from "../../../mappers/map-prayer-group";
import { PrayerGroupUserSummary } from "../../../types/prayer-group-types";

export const usePrayerGroupUsers = (prayerGroupId: number) => {
  const [prayerGroupUsers, setPrayerGroupUsers] = React.useState<
    PrayerGroupUserSummary[]
  >([]);

  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isError, setIsError] = React.useState<boolean>(false);

  const getPrayerGroupUsers = useGetPrayerGroupUsers();

  const loadPrayerGroupUsers = React.useCallback(async () => {
    setIsLoading(true);
    const response = await getPrayerGroupUsers(prayerGroupId, [
      PrayerGroupRole.Member,
      PrayerGroupRole.Admin,
    ]);
    setIsLoading(false);

    if (response.isError) {
      setIsError(true);
      return;
    }

    const responseUsers = response.value.users.map((user) =>
      mapPrayerGroupUser(user)
    );
    setPrayerGroupUsers(responseUsers);
    console.log(responseUsers);
  }, [getPrayerGroupUsers, prayerGroupId]);

  React.useEffect(() => {
    loadPrayerGroupUsers();
  }, [loadPrayerGroupUsers]);

  return { isLoading, setIsLoading, isError, prayerGroupUsers };
};
