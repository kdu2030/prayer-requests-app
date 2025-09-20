import { Href, router } from "expo-router";
import { debounce } from "lodash";
import * as React from "react";

import { usePostPrayerGroupUsersQuery } from "../../../api/post-prayer-group-users-query";
import { usePutPrayerGroupUsers } from "../../../api/put-prayer-group-users";
import {
  JoinStatus,
  PrayerGroupRole,
} from "../../../constants/prayer-group-constants";
import { useApiDataContext } from "../../../hooks/use-api-data";
import { useI18N } from "../../../hooks/use-i18n";
import { PrayerGroupUserSummary } from "../../../types/prayer-group-types";
import { usePrayerGroupContext } from "../prayer-group-context";
import {
  mapPrayerGroupUsers,
  normalizeText,
} from "./prayer-group-user-helpers";
import { PRAYER_GROUP_USERS_QUERY } from "./prayer-group-users-constants";

export const usePrayerGroupUsers = (prayerGroupId: number) => {
  const { translate } = useI18N();

  const { prayerGroupDetails, setPrayerGroupDetails } = usePrayerGroupContext();
  const { userData, setUserData } = useApiDataContext();

  const [prayerGroupUsers, setPrayerGroupUsers] = React.useState<
    PrayerGroupUserSummary[]
  >([]);
  const [filteredUsers, setFilteredUsers] = React.useState<
    PrayerGroupUserSummary[]
  >([]);

  const [userQuery, setUserQuery] = React.useState<string>("");

  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isError, setIsError] = React.useState<boolean>(false);

  const [isSaveLoading, setIsSaveLoading] = React.useState<boolean>(false);

  const [saveError, setSaveError] = React.useState<string | undefined>();
  const [successMessage, setSuccessMessage] = React.useState<
    string | undefined
  >();

  const [userToDeleteIndex, setUserToDeleteIndex] = React.useState<
    number | undefined
  >();

  const [isDeleteModalOpen, setIsDeleteModalOpen] =
    React.useState<boolean>(false);

  const postPrayerGroupUsersQuery = usePostPrayerGroupUsersQuery();

  const putPrayerGroupUsers = usePutPrayerGroupUsers();

  const loadPrayerGroupUsers = React.useCallback(async () => {
    setIsLoading(true);

    const response = await postPrayerGroupUsersQuery(
      prayerGroupId,
      PRAYER_GROUP_USERS_QUERY
    );

    setIsLoading(false);

    if (response.isError) {
      setIsError(true);
      return;
    }

    const responseUsers = response.value.prayerGroupUsers;

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

    const userToDelete = filteredUsers[userToDeleteIndex];

    const updatedPrayerGroupUsers = [...prayerGroupUsers].filter(
      (prayerGroupUser) => prayerGroupUser.userId !== userToDelete.userId
    );

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

    updatedFilteredUsers[index].prayerGroupRole = role;
    updatedUsers[prayerGroupUsersIndex].prayerGroupRole = role;

    setPrayerGroupUsers(updatedUsers);
    setFilteredUsers(updatedFilteredUsers);
  };

  const onSavePrayerGroupUsers = async () => {
    setIsSaveLoading(true);

    const prayerGroupUserUpdateModels = mapPrayerGroupUsers(prayerGroupUsers);
    const response = await putPrayerGroupUsers(
      prayerGroupId,
      prayerGroupUserUpdateModels
    );

    setIsSaveLoading(false);

    if (response.isError) {
      setSaveError(
        translate("toaster.failed.updateFailure", {
          item: translate("prayerGroup.manageUsers.usersLabel"),
        })
      );
      return;
    }

    setSuccessMessage(translate("prayerGroup.manageUsers.updateSuccess"));

    const updatedPrayerGroupUsers = response.value.prayerGroupUsers ?? [];

    const updatedPrayerGroupUser = updatedPrayerGroupUsers?.find((user) => {
      return user.userId === userData?.userId;
    });

    const updatedAdmins = updatedPrayerGroupUsers?.filter(
      (prayerGroupUser) =>
        prayerGroupUser.prayerGroupRole === PrayerGroupRole.Admin
    );

    const updatedUserRole = updatedPrayerGroupUser?.prayerGroupRole;

    const userDeletedThemselves = !updatedPrayerGroupUser;

    setPrayerGroupDetails({
      ...prayerGroupDetails,
      admins: updatedAdmins,
      userJoinStatus: !updatedPrayerGroupUser
        ? JoinStatus.NotJoined
        : JoinStatus.Joined,
      prayerGroupRole: updatedPrayerGroupUser ? updatedUserRole : undefined,
    });

    if (userDeletedThemselves) {
      const updatedPrayerGroups = [...(userData?.prayerGroups ?? [])].filter(
        (group) => group.prayerGroupId !== prayerGroupDetails?.prayerGroupId
      );
      setUserData({ ...userData, prayerGroups: updatedPrayerGroups });
    }

    if (userDeletedThemselves || updatedUserRole != PrayerGroupRole.Admin) {
      router.push({
        pathname: "/prayergroup/[id]",
        params: { id: prayerGroupId },
      } as Href<any>);
      return;
    }

    setPrayerGroupUsers(updatedPrayerGroupUsers ?? []);
    setFilteredUsers(updatedPrayerGroupUsers ?? []);
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
    successMessage,
    setSuccessMessage,
    isSaveLoading,
    onSavePrayerGroupUsers,
  };
};
