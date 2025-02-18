import * as React from "react";

import { useDeletePrayerGroupUsers } from "../../api/delete-prayer-group-users";
import { useGetPrayerGroup } from "../../api/get-prayer-group";
import {
  PrayerGroupUserToAdd,
  usePostPrayerGroupUsers,
} from "../../api/post-prayer-group-users";
import { PrayerGroupRole } from "../../constants/prayer-group-constants";
import { useApiDataContext } from "../../hooks/use-api-data";
import { useI18N } from "../../hooks/use-i18n";
import { mapPrayerGroupDetails } from "../../mappers/map-prayer-group";
import {
  PrayerGroupDetails,
  PrayerGroupSummary,
} from "../../types/prayer-group-types";

export const usePrayerGroup = (prayerGroupId: number) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const [prayerGroupDetails, setPrayerGroupDetails] =
    React.useState<PrayerGroupDetails>();

  const [isRemoveUserLoading, setIsRemoveUserLoading] =
    React.useState<boolean>(false);
  const [isAddUserLoading, setIsAddUserLoading] =
    React.useState<boolean>(false);

  const [snackbarError, setSnackbarError] = React.useState<string | undefined>(
    undefined
  );

  const { userData, setUserData } = useApiDataContext();

  const getPrayerGroup = useGetPrayerGroup();
  const deletePrayerGroupUsers = useDeletePrayerGroupUsers();
  const postPrayerGroupUsers = usePostPrayerGroupUsers();

  const { translate } = useI18N();

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

  const onAddUser = async () => {
    if (!userData?.userId) {
      return;
    }

    const userToAdd: PrayerGroupUserToAdd = {
      id: userData.userId,
      role: PrayerGroupRole.Member,
    };

    setIsAddUserLoading(true);
    const response = await postPrayerGroupUsers(prayerGroupId, [userToAdd]);
    setIsAddUserLoading(false);

    if (response.isError) {
      setSnackbarError(translate("toaster.failed.addUserFailure"));
      return;
    }

    const prayerGroupSummary: PrayerGroupSummary = {
      prayerGroupId,
      groupName: prayerGroupDetails?.groupName,
      imageFile: prayerGroupDetails?.imageFile,
    };

    const prayerGroups = [...(userData.prayerGroups ?? []), prayerGroupSummary];
    prayerGroups.sort(
      (groupA, groupB) =>
        (groupA.prayerGroupId ?? -1) - (groupB.prayerGroupId ?? -1)
    );

    setPrayerGroupDetails({
      ...prayerGroupDetails,
      isUserJoined: true,
      userRole: PrayerGroupRole.Member,
    });
    setUserData({ ...userData, prayerGroups });
  };

  const onRemoveUser = async () => {
    if (!userData?.userId) {
      return;
    }

    setIsRemoveUserLoading(true);
    const response = await deletePrayerGroupUsers(prayerGroupId, [
      userData?.userId,
    ]);
    setIsRemoveUserLoading(false);

    if (response.isError) {
      setSnackbarError(
        translate("toaster.failed.removeFailure", {
          item: translate("common.user"),
        })
      );
      return;
    }

    setPrayerGroupDetails({
      ...prayerGroupDetails,
      isUserJoined: false,
      userRole: undefined,
    });

    const prayerGroups = [...(userData.prayerGroups ?? [])];
    const deletedPrayerGroupIndex = prayerGroups.findIndex(
      (group) => group.prayerGroupId === prayerGroupId
    );
    prayerGroups.splice(deletedPrayerGroupIndex, 1);

    setUserData({ ...userData, prayerGroups });
  };

  return {
    isLoading,
    setIsLoading,
    prayerGroupDetails,
    snackbarError,
    setSnackbarError,
    onRemoveUser,
    isRemoveUserLoading,
    onAddUser,
    isAddUserLoading,
  };
};
