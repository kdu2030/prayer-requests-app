import { Href, router } from "expo-router";
import { debounce } from "lodash";
import * as React from "react";

import { useDeletePrayerGroupUsers } from "../../../api/delete-prayer-group-users";
import { useGetPrayerGroupUsers } from "../../../api/get-prayer-group-users";
import { usePutPrayerGroupAdmins } from "../../../api/put-prayer-group-admins";
import { PrayerGroupRole } from "../../../constants/prayer-group-constants";
import { useApiDataContext } from "../../../hooks/use-api-data";
import { useI18N } from "../../../hooks/use-i18n";
import { mapPrayerGroupUser } from "../../../mappers/map-prayer-group";
import { DeletablePrayerGroupUser } from "../../../types/prayer-group-types";
import { usePrayerGroupContext } from "../prayer-group-context";
import { normalizeText } from "./prayer-group-user-helpers";

export const usePrayerGroupUsers = (prayerGroupId: number) => {
  const { translate } = useI18N();

  const { prayerGroupDetails, setPrayerGroupDetails } = usePrayerGroupContext();
  const { userData, setUserData } = useApiDataContext();

  const [prayerGroupUsers, setPrayerGroupUsers] = React.useState<
    DeletablePrayerGroupUser[]
  >([]);
  const [filteredUsers, setFilteredUsers] = React.useState<
    DeletablePrayerGroupUser[]
  >([]);

  const [userQuery, setUserQuery] = React.useState<string>("");

  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isError, setIsError] = React.useState<boolean>(false);

  const [isSaveLoading, setIsSaveLoading] = React.useState<boolean>(false);
  const [saveError, setSaveError] = React.useState<string | undefined>();

  const [userToDeleteIndex, setUserToDeleteIndex] = React.useState<
    number | undefined
  >();

  const [isDeleteModalOpen, setIsDeleteModalOpen] =
    React.useState<boolean>(false);

  const getPrayerGroupUsers = useGetPrayerGroupUsers();

  const putPrayerGroupAdmins = usePutPrayerGroupAdmins();
  const deletePrayerGroupUsers = useDeletePrayerGroupUsers();

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prayerGroupId]);

  React.useEffect(() => {
    loadPrayerGroupUsers();
  }, [loadPrayerGroupUsers]);

  const filterUsers = React.useCallback(
    (query: string) => {
      const normalizedQuery = query.toLocaleLowerCase().replace(/( |@)/g, "");

      const newFilteredUsers = prayerGroupUsers.filter(
        (user) =>
          normalizeText(user.fullName).includes(normalizedQuery) ||
          normalizeText(user.username).includes(normalizedQuery)
      );

      setFilteredUsers(newFilteredUsers);
    },
    [prayerGroupUsers]
  );

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

  const onSavePrayerGroupUsers = async () => {
    const userIdsToDelete: number[] = [];
    const adminUserIds: number[] = [];

    prayerGroupUsers.forEach((user) => {
      if (!user.userId) {
        return;
      }

      if (user.isDeleted) {
        userIdsToDelete.push(user.userId);
      }

      if (user.role === PrayerGroupRole.Admin && !user.isDeleted) {
        adminUserIds.push(user.userId);
      }
    });

    setIsSaveLoading(true);
    const deleteUserPromise =
      userIdsToDelete.length > 0
        ? deletePrayerGroupUsers(prayerGroupId, userIdsToDelete)
        : { isError: false };
    const [deleteUserResponse, updateAdminsResponse] = await Promise.all([
      deleteUserPromise,
      putPrayerGroupAdmins(prayerGroupId, adminUserIds),
    ]);
    setIsSaveLoading(false);

    if (deleteUserResponse.isError || updateAdminsResponse.isError) {
      setSaveError(
        translate("toaster.failed.updateFailure", {
          item: translate("prayerGroup.manageUsers.usersLabel"),
        })
      );
      return;
    }

    const deletedUserIdsSet = new Set<number>(userIdsToDelete);
    const adminUserIdsSet = new Set<number>(adminUserIds);

    const updatedAdmins = prayerGroupDetails?.admins?.filter(
      (admin) =>
        !deletedUserIdsSet.has(admin.userId ?? -1) &&
        adminUserIdsSet.has(admin.userId ?? -1)
    );

    const userDeletedThemselves = deletedUserIdsSet.has(userData?.userId ?? -1);
    const userSelfAdminRemoval = !adminUserIdsSet.has(userData?.userId ?? -1);

    const updatedUserRole = userSelfAdminRemoval
      ? PrayerGroupRole.Member
      : prayerGroupDetails?.userRole;

    setPrayerGroupDetails({
      ...prayerGroupDetails,
      admins: updatedAdmins,
      isUserJoined: !userDeletedThemselves,
      userRole: userDeletedThemselves ? undefined : updatedUserRole,
    });

    if (userDeletedThemselves) {
      const updatedPrayerGroups = [...(userData?.prayerGroups ?? [])].filter(
        (group) => group.prayerGroupId !== prayerGroupDetails?.prayerGroupId
      );
      setUserData({ ...userData, prayerGroups: updatedPrayerGroups });
    }

    if (userDeletedThemselves || userSelfAdminRemoval) {
      router.push({
        pathname: "/prayergroup/[id]",
        params: { id: prayerGroupId },
      } as Href<any>);
      return;
    }

    const updatedPrayerGroupUsers = prayerGroupUsers.filter(
      (user) => !user.isDeleted
    );

    setPrayerGroupUsers(updatedPrayerGroupUsers);
    setFilteredUsers(updatedPrayerGroupUsers);
    setUserQuery("");
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
    loadPrayerGroupUsers,
    saveError,
    setSaveError,
    isSaveLoading,
    onSavePrayerGroupUsers,
  };
};
