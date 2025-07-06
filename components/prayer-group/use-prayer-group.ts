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
import { LoadStatus } from "../../types/api-response-types";
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

  const [prayerRequestFilters, setPrayerRequestFilters] = React.useState<
    Omit<PrayerRequestFilterCriteria, "prayerGroupIds">
  >(DEFAULT_PRAYER_REQUEST_FILTERS);

  const [prayerRequests, setPrayerRequests] = React.useState<
    PrayerRequestModel[]
  >([]);
  const prayerRequestTotalCount = React.useRef<number | null>();

  const [prayerRequestLoadStatus, setPrayerRequestLoadStatus] =
    React.useState<LoadStatus>(LoadStatus.NotStarted);
  const [nextPrayerRequestLoadStatus, setNextPrayerRequestLoadStatus] =
    React.useState<LoadStatus>(LoadStatus.NotStarted);

  const { prayerGroupDetails, setPrayerGroupDetails } = usePrayerGroupContext();

  const [isRemoveUserLoading, setIsRemoveUserLoading] =
    React.useState<boolean>(false);
  const [isAddUserLoading, setIsAddUserLoading] =
    React.useState<boolean>(false);

  const [snackbarError, setSnackbarError] = React.useState<string | undefined>(
    undefined
  );

  const [isOptionsOpen, setIsOptionsOpen] = React.useState<boolean>(false);

  const { userData, setUserData } = useApiDataContext();

  const getPrayerGroup = useGetPrayerGroup();
  const deletePrayerGroupUsers = useDeletePrayerGroupUsers();
  const postPrayerGroupUsers = usePostPrayerGroupUsers();

  const postPrayerRequestFilter = usePostPrayerRequestFilter();

  const { translate } = useI18N();

  const cleanupPrayerRequests = async () => {
    setPrayerRequestFilters(DEFAULT_PRAYER_REQUEST_FILTERS);
    setPrayerRequests([]);
    prayerRequestTotalCount.current = null;
  };

  const loadNextPrayerRequestsForGroup = async (
    prayerGroupId: number,
    showCompleteSpinner: boolean,
    customFilters?: PrayerRequestFilterCriteria
  ) => {
    const setLoadStatus = showCompleteSpinner
      ? setPrayerRequestLoadStatus
      : setNextPrayerRequestLoadStatus;

    const filters = customFilters ?? prayerRequestFilters;

    if (!userData?.userId) {
      return;
    }

    setLoadStatus(LoadStatus.Loading);

    const response = await postPrayerRequestFilter(userData.userId, {
      ...filters,
      prayerGroupIds: [prayerGroupId],
    });

    if (response.isError && showCompleteSpinner) {
      setLoadStatus(LoadStatus.Error);
      setPrayerRequests([]);
      return;
    } else if (response.isError) {
      setLoadStatus(LoadStatus.Error);
      setSnackbarError(translate("prayerRequest.loading.failure"));
      return;
    }

    // Since prayer requests can be infinitely scrolled
    // We don't want to get rid of the current existing prayer requests unless group ID changes.
    setPrayerRequests((existingRequests) => [
      ...existingRequests,
      ...mapPrayerRequests(response.value.prayerRequests ?? []),
    ]);
    prayerRequestTotalCount.current = response.value.totalCount;

    setLoadStatus(LoadStatus.Success);
  };

  const loadPrayerGroup = async () => {
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
  };

  const loadPrayerGroupData = async () => {
    cleanupPrayerRequests();

    await loadPrayerGroup();
    await loadNextPrayerRequestsForGroup(
      prayerGroupId,
      true,
      DEFAULT_PRAYER_REQUEST_FILTERS
    );
  };

  React.useEffect(() => {
    loadPrayerGroupData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prayerGroupId]);

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
    setIsOptionsOpen(true);
  };

  const onEndReached = async () => {
    if (
      nextPrayerRequestLoadStatus === LoadStatus.Loading ||
      prayerRequestLoadStatus === LoadStatus.Loading
    ) {
      return;
    }

    if (
      prayerRequestTotalCount.current == null ||
      prayerRequests.length >= prayerRequestTotalCount.current
    ) {
      return;
    }

    const updatedPrayerRequestFilters: PrayerRequestFilterCriteria = {
      ...prayerRequestFilters,
      pageIndex: (prayerRequestFilters.pageIndex ?? 0) + 1,
    };
    setPrayerRequestFilters(updatedPrayerRequestFilters);
    await loadNextPrayerRequestsForGroup(
      prayerGroupId,
      false,
      updatedPrayerRequestFilters
    );
  };

  const showPrayerRequestList = React.useMemo(() => {
    return (
      prayerRequestLoadStatus === LoadStatus.Success &&
      prayerRequests.length > 0
    );
  }, [prayerRequestLoadStatus, prayerRequests.length]);

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
    isOptionsOpen,
    onOpenOptions,
    prayerRequestFilters,
    setPrayerRequestFilters,
    prayerRequests,
    onEndReached,
    setPrayerRequests,
    loadNextPrayerRequestsForGroup,
    nextPrayerRequestLoadStatus,
    prayerRequestLoadStatus,
    showPrayerRequestList,
    setIsOptionsOpen,
  };
};
