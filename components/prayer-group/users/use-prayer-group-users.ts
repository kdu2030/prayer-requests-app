import { debounce } from "lodash";
import * as React from "react";

import { useGetPrayerGroupUsers } from "../../../api/get-prayer-group-users";
import { PrayerGroupRole } from "../../../constants/prayer-group-constants";
import { mapPrayerGroupUser } from "../../../mappers/map-prayer-group";
import { PrayerGroupUserSummary } from "../../../types/prayer-group-types";

export const usePrayerGroupUsers = (prayerGroupId: number) => {
  const [prayerGroupUsers, setPrayerGroupUsers] = React.useState<
    PrayerGroupUserSummary[]
  >([]);
  const [filteredUsers, setFilteredUsers] = React.useState<
    PrayerGroupUserSummary[]
  >([]);

  const [userQuery, setUserQuery] = React.useState<string>("");

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
    setFilteredUsers(responseUsers);
  }, [getPrayerGroupUsers, prayerGroupId]);

  React.useEffect(() => {
    loadPrayerGroupUsers();
  }, [loadPrayerGroupUsers]);

  const filterUsers = (query: string) => {
    const normalizedQuery = query.toLocaleLowerCase();

    const newFilteredUsers = prayerGroupUsers.filter(
      (user) =>
        (user.fullName?.toLocaleLowerCase() ?? "").includes(normalizedQuery) ||
        (user.username?.toLocaleLowerCase() ?? "").includes(normalizedQuery)
    );

    setFilteredUsers(newFilteredUsers);
  };

  const onQueryChange = (query: string) => {
    setUserQuery(query);
    const debouncedFilter = debounce(() => filterUsers(query), 200);
    debouncedFilter();
  };

  return {
    isLoading,
    setIsLoading,
    isError,
    prayerGroupUsers,
    userQuery,
    setUserQuery,
    onQueryChange,
    filteredUsers,
  };
};
