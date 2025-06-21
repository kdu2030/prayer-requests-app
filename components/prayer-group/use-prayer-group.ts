import { BottomSheetProps } from "@gorhom/bottom-sheet";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import * as React from "react";

import { useDeletePrayerGroupUsers } from "../../api/delete-prayer-group-users";
import { useGetPrayerGroup } from "../../api/get-prayer-group";
import {
  PrayerGroupUserToAdd,
  usePostPrayerGroupUsers,
} from "../../api/post-prayer-group-users";
import { usePostPrayerRequestFilter } from "../../api/post-prayer-request-filter";
import { PrayerGroupRole } from "../../constants/prayer-group-constants";
import { useApiDataContext } from "../../hooks/use-api-data";
import { useI18N } from "../../hooks/use-i18n";
import { mapPrayerGroupDetails } from "../../mappers/map-prayer-group";
import { mapPrayerRequests } from "../../mappers/map-prayer-request";
import { PrayerGroupSummary } from "../../types/prayer-group-types";
import {
  PrayerRequestFilterCriteria,
  PrayerRequestModel,
} from "../../types/prayer-request-types";
import { DEFAULT_PRAYER_REQUEST_FILTERS } from "./prayer-group-constants";
import { usePrayerGroupContext } from "./prayer-group-context";

export const usePrayerGroup = (prayerGroupId: number) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [showErrorScreen, setShowErrorScreen] = React.useState<boolean>(false);

  const [areRequestsLoading, setAreRequestsLoading] =
    React.useState<boolean>(false);

  const [prayerRequestFilters, setPrayerRequestFilters] = React.useState<
    Omit<PrayerRequestFilterCriteria, "prayerGroupIds">
  >(DEFAULT_PRAYER_REQUEST_FILTERS);

  const [prayerRequests, setPrayerRequests] = React.useState<
    PrayerRequestModel[]
  >([]);

  const { prayerGroupDetails, setPrayerGroupDetails } = usePrayerGroupContext();

  const [isRemoveUserLoading, setIsRemoveUserLoading] =
    React.useState<boolean>(false);
  const [isAddUserLoading, setIsAddUserLoading] =
    React.useState<boolean>(false);

  const [snackbarError, setSnackbarError] = React.useState<string | undefined>(
    undefined
  );

  const prayerGroupOptionsRef = React.useRef<
    BottomSheetProps & BottomSheetMethods
  >(null);

  const { userData, setUserData } = useApiDataContext();

  const getPrayerGroup = useGetPrayerGroup();
  const deletePrayerGroupUsers = useDeletePrayerGroupUsers();
  const postPrayerGroupUsers = usePostPrayerGroupUsers();
  const postPrayerRequestFilter = usePostPrayerRequestFilter();

  const { translate } = useI18N();

  const loadPrayerGroup = React.useCallback(async () => {
    setPrayerGroupDetails(undefined);
    setIsLoading(true);

    const response = await getPrayerGroup(prayerGroupId);
    setIsLoading(false);

    if (response.isError) {
      setShowErrorScreen(true);
      return;
    }

    if (response.value.id !== prayerGroupId) {
      // This could happen if the user switches prayer groups in the middle of loading
      return;
    }

    const loadedPrayerGroupDetails = mapPrayerGroupDetails(response.value);
    setPrayerGroupDetails(loadedPrayerGroupDetails);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prayerGroupId]);

  React.useEffect(() => {
    loadPrayerGroup();
  }, [loadPrayerGroup]);

  const loadPrayerRequestsForGroup = React.useCallback(async () => {
    if (!userData?.userId) {
      return;
    }

    setAreRequestsLoading(true);

    const response = await postPrayerRequestFilter(userData.userId, {
      ...prayerRequestFilters,
      prayerGroupIds: [prayerGroupId],
    });

    setAreRequestsLoading(false);

    if (response.isError) {
      // TODO: Add error handling here
      setPrayerRequests([]);
      return;
    }

    setPrayerRequests(mapPrayerRequests(response.value));
    console.log(mapPrayerRequests(response.value));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prayerGroupId, userData?.userId]);

  React.useEffect(() => {
    loadPrayerRequestsForGroup();
  }, [loadPrayerRequestsForGroup]);

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

  const onRetry = () => {
    setShowErrorScreen(false);
    loadPrayerGroup();
  };

  const onOpenOptions = () => {
    if (!prayerGroupOptionsRef.current) {
      return;
    }

    prayerGroupOptionsRef.current.snapToIndex(0);
  };

  return {
    isLoading,
    setIsLoading,
    snackbarError,
    setSnackbarError,
    onRemoveUser,
    isRemoveUserLoading,
    onAddUser,
    isAddUserLoading,
    showErrorScreen,
    setShowErrorScreen,
    onRetry,
    prayerGroupOptionsRef,
    onOpenOptions,
    prayerRequestFilters,
    setPrayerRequestFilters,
    areRequestsLoading,
    prayerRequests,
  };
};
