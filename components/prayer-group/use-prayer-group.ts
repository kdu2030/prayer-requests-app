import { BottomSheetProps } from "@gorhom/bottom-sheet";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import * as React from "react";

import { useDeletePrayerGroupUsers } from "../../api/delete-prayer-group-users";
import { useDeletePrayerRequestLike } from "../../api/delete-prayer-request-like";
import { useGetPrayerGroup } from "../../api/get-prayer-group";
import {
  PrayerGroupUserToAdd,
  usePostPrayerGroupUsers,
} from "../../api/post-prayer-group-users";
import { usePostPrayerRequestFilter } from "../../api/post-prayer-request-filter";
import { usePostPrayerRequestLike } from "../../api/post-prayer-request-like";
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

  const [prayerRequestFilters, setPrayerRequestFilters] = React.useState<
    Omit<PrayerRequestFilterCriteria, "prayerGroupIds">
  >(DEFAULT_PRAYER_REQUEST_FILTERS);

  const [prayerRequests, setPrayerRequests] = React.useState<
    PrayerRequestModel[]
  >([]);
  const prayerRequestTotalCount = React.useRef<number | null>();

  const [areRequestsLoading, setAreRequestsLoading] =
    React.useState<boolean>(false);
  const [areNextRequestsLoading, setAreNextRequestsLoading] =
    React.useState<boolean>(false);

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
  const postPrayerRequestLike = usePostPrayerRequestLike();
  const deletePrayerRequestLike = useDeletePrayerRequestLike();

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
    const setShowSpinner = showCompleteSpinner
      ? setAreRequestsLoading
      : setAreNextRequestsLoading;

    const filters = customFilters ?? prayerRequestFilters;

    if (!userData?.userId) {
      return;
    }

    setShowSpinner(true);

    const response = await postPrayerRequestFilter(userData.userId, {
      ...filters,
      prayerGroupIds: [prayerGroupId],
    });

    setShowSpinner(false);

    if (response.isError) {
      // TODO: Add error handling here
      setPrayerRequests([]);
      return;
    }

    // Since prayer requests can be infinitely scrolled
    // We don't want to get rid of the current existing prayer requests unless group ID changes.
    setPrayerRequests((existingRequests) => [
      ...existingRequests,
      ...mapPrayerRequests(response.value.prayerRequests ?? []),
    ]);
    prayerRequestTotalCount.current = response.value.totalCount;
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
    if (!prayerGroupOptionsRef.current) {
      return;
    }

    prayerGroupOptionsRef.current.snapToIndex(0);
  };

  const onEndReached = async () => {
    if (areNextRequestsLoading || areRequestsLoading) {
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

  const addPrayerRequestLike = async (
    userId: number,
    prayerRequestId: number
  ) => {
    const response = await postPrayerRequestLike(userId, prayerRequestId);

    if (response.isError) {
      setSnackbarError(translate("prayerRequest.addLike.failure"));
      return;
    }

    const updatedPrayerRequests = prayerRequests.map((prayerRequest) => {
      if (prayerRequest.prayerRequestId !== prayerRequestId) {
        return prayerRequest;
      }

      return {
        ...prayerRequest,
        isUserLiked: true,
        likeCount: (prayerRequest.likeCount ?? 0) + 1,
      };
    });

    setPrayerRequests(updatedPrayerRequests);
  };

  const removePrayerRequestLike = async (
    userId: number,
    prayerRequestId: number
  ) => {
    const response = await deletePrayerRequestLike(prayerRequestId, userId);

    if (response.isError) {
      setSnackbarError(translate("prayerRequest.removeLike.failure"));
      return;
    }

    const updatedPrayerRequests = prayerRequests.map((prayerRequest) => {
      if (prayerRequest.prayerRequestId !== prayerRequestId) {
        return prayerRequest;
      }

      return {
        ...prayerRequest,
        isUserLiked: false,
        likeCount: prayerRequest.likeCount ? prayerRequest.likeCount - 1 : 0,
      };
    });

    setPrayerRequests(updatedPrayerRequests);
  };

  const updatePrayerRequestLikes = async (
    prayerRequestId: number,
    addLike: boolean
  ) => {
    const userId = userData?.userId;

    if (!userId) {
      return;
    }

    if (addLike) {
      await addPrayerRequestLike(userId, prayerRequestId);
      return;
    }

    await removePrayerRequestLike(userId, prayerRequestId);
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
    onEndReached,
    areNextRequestsLoading,
    updatePrayerRequestLikes,
  };
};
