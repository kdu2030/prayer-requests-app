import * as React from "react";

import { useDeletePrayerGroupUsers } from "../../api/delete-prayer-group-users";
import { useGetPrayerGroup } from "../../api/get-prayer-group";
import { useApiDataContext } from "../../hooks/use-api-data";
import { useI18N } from "../../hooks/use-i18n";
import { mapPrayerGroupDetails } from "../../mappers/map-prayer-group";
import { PrayerGroupDetails } from "../../types/prayer-group-types";

export const usePrayerGroup = (prayerGroupId: number) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [prayerGroupDetails, setPrayerGroupDetails] =
    React.useState<PrayerGroupDetails>();
  const [isRemoveUserLoading, setIsRemoveUserLoading] =
    React.useState<boolean>(false);
  const [snackbarError, setSnackbarError] = React.useState<string | undefined>(
    undefined
  );

  const { userData, setUserData } = useApiDataContext();

  const getPrayerGroup = useGetPrayerGroup();
  const deletePrayerGroupUsers = useDeletePrayerGroupUsers();

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
  };
};
