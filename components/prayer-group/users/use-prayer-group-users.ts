import { usePathname } from "expo-router";
import { debounce } from "lodash";
import * as React from "react";

import { useGetPrayerGroupUsers } from "../../../api/get-prayer-group-users";
import { PrayerGroupRole } from "../../../constants/prayer-group-constants";
import { mapPrayerGroupUser } from "../../../mappers/map-prayer-group";
import { DeletablePrayerGroupUser } from "../../../types/prayer-group-types";
import { usePrayerGroupContext } from "../prayer-group-context";
import { normalizeText } from "./prayer-group-user-helpers";

export const usePrayerGroupUsers = (prayerGroupId: number) => {
  const [prayerGroupUsers, setPrayerGroupUsers] = React.useState<
    DeletablePrayerGroupUser[]
  >([]);
  const [filteredUsers, setFilteredUsers] = React.useState<
    DeletablePrayerGroupUser[]
  >([]);

  const [userQuery, setUserQuery] = React.useState<string>("");

  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isError, setIsError] = React.useState<boolean>(false);

  const [userToDeleteIndex, setUserToDeleteIndex] = React.useState<
    number | undefined
  >();

  const [isDeleteModalOpen, setIsDeleteModalOpen] =
    React.useState<boolean>(false);

  const { prayerGroupDetails } = usePrayerGroupContext();
  const pathname = usePathname();

  const getPrayerGroupUsers = useGetPrayerGroupUsers();

  const loadPrayerGroupUsers = React.useCallback(async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 10));

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

  const resetPrayerGroupUsers = React.useCallback(() => {
    const prayerGroupAdminsSet = new Set<number>();
    prayerGroupDetails?.admins?.forEach((admin) => {
      admin.userId && prayerGroupAdminsSet.add(admin.userId);
    });

    const resetPrayerGroupUsers = [...prayerGroupUsers].reduce(
      (prayerGroupUsers: DeletablePrayerGroupUser[], user) => {
        if (!user.userId) {
          return prayerGroupUsers;
        }

        const isAdmin = prayerGroupAdminsSet.has(user.userId);

        prayerGroupUsers.push({
          ...user,
          isDeleted: false,
          role: isAdmin ? PrayerGroupRole.Admin : PrayerGroupRole.Member,
        });

        return prayerGroupUsers;
      },
      []
    );

    setPrayerGroupUsers(resetPrayerGroupUsers);
    setFilteredUsers(resetPrayerGroupUsers);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prayerGroupDetails?.admins]);

  React.useEffect(() => {
    resetPrayerGroupUsers();
  }, [resetPrayerGroupUsers, pathname]);

  const filterUsers = (query: string) => {
    const normalizedQuery = query.toLocaleLowerCase().replace(/( |@)/g, "");

    const newFilteredUsers = prayerGroupUsers.filter(
      (user) =>
        normalizeText(user.fullName).includes(normalizedQuery) ||
        normalizeText(user.username).includes(normalizedQuery)
    );

    setFilteredUsers(newFilteredUsers);
  };

  const onQueryChange = (query: string) => {
    setUserQuery(query);
    const debouncedFilter = debounce(() => filterUsers(query), 200);
    debouncedFilter();
  };

  const onDeletePress = (index: number) => {
    setUserToDeleteIndex(index);
    setIsDeleteModalOpen(true);
  };

  const onDelete = () => {
    if (userToDeleteIndex == null) {
      throw new Error("Cannot delete without a user to delete index.");
    }

    const updatedPrayerGroupUsers = [...prayerGroupUsers];

    const userToDelete = { ...filteredUsers[userToDeleteIndex] };
    const prayerGroupUsersIndex = prayerGroupUsers.findIndex(
      (user) => user.userId === userToDelete.userId
    );

    userToDelete.isDeleted = true;

    updatedPrayerGroupUsers[prayerGroupUsersIndex] = userToDelete;

    setPrayerGroupUsers(updatedPrayerGroupUsers);
    setFilteredUsers(updatedPrayerGroupUsers);
    setUserQuery("");

    setIsDeleteModalOpen(false);
  };

  const onRoleChange = (index: number, role: PrayerGroupRole) => {
    const userToChange = filteredUsers[index];
    const prayerGroupUsersIndex = prayerGroupUsers.findIndex(
      (user) => user.userId === userToChange.userId
    );

    const updatedFilteredUsers = [...filteredUsers];
    const updatedUsers = [...prayerGroupUsers];

    updatedFilteredUsers[index].role = role;
    updatedUsers[prayerGroupUsersIndex].role = role;

    setPrayerGroupUsers(updatedUsers);
    setFilteredUsers(updatedFilteredUsers);
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
    isDeleteModalOpen,
    onDeletePress,
    setIsDeleteModalOpen,
    userToDeleteIndex,
    onDelete,
    onRoleChange,
  };
};
