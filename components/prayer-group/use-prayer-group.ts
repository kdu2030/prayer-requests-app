import { BottomSheetProps } from "@gorhom/bottom-sheet";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import * as React from "react";

import { useGetPrayerGroup } from "../../api/get-prayer-group";

import { usePostPrayerRequestFilter } from "../../api/post-prayer-request-filter";
import {
  JoinStatus,
  PrayerGroupRole,
} from "../../constants/prayer-group-constants";
import { useApiDataContext } from "../../hooks/use-api-data";
import { useI18N } from "../../hooks/use-i18n";

import { mapPrayerRequests } from "../../mappers/map-prayer-request";
import { LoadStatus } from "../../types/api-response-types";
import { PrayerGroupSummary } from "../../types/prayer-group-types";
import {
  PrayerRequestFilterCriteria,
  PrayerRequestModel,
} from "../../types/prayer-request-types";
import { DEFAULT_PRAYER_REQUEST_FILTERS } from "./prayer-group-constants";
import { usePrayerGroupContext } from "./prayer-group-context";
import { usePostPrayerGroupUser } from "../../api/post-prayer-group-user";
import { useDeletePrayerGroupUser } from "../../api/delete-prayer-group-user";

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

  const prayerGroupOptionsRef = React.useRef<
    BottomSheetProps & BottomSheetMethods
  >(null);

  const { userData, setUserData } = useApiDataContext();

  const getPrayerGroup = useGetPrayerGroup();
  const deletePrayerGroupUser = useDeletePrayerGroupUser();
  const postPrayerGroupUser = usePostPrayerGroupUser();

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

    if (response.value.prayerGroupId !== prayerGroupId) {
      // This could happen if the user switches prayer groups in the middle of loading
      return;
    }

    setPrayerGroupDetails(response.value);
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

    setIsAddUserLoading(true);
    const response = await postPrayerGroupUser(prayerGroupId, userData.userId);
    setIsAddUserLoading(false);

    if (response.isError) {
      setSnackbarError(translate("toaster.failed.addUserFailure"));
      return;
    }

    const joinedPrayerGroupSummary: PrayerGroupSummary = {
      prayerGroupId,
      groupName: prayerGroupDetails?.groupName,
      avatarFile: prayerGroupDetails?.avatarFile,
    };

    setPrayerGroupDetails({
      ...prayerGroupDetails,
      userJoinStatus: JoinStatus.Joined,
      prayerGroupRole: PrayerGroupRole.Member,
    });
    setUserData((existingUserData) => {
      const updatedPrayerGroups = existingUserData.prayerGroups?.concat(
        joinedPrayerGroupSummary
      );
      return {
        ...existingUserData,
        prayerGroups: updatedPrayerGroups,
      };
    });
  };

  const onRemoveUser = async () => {
    if (!userData?.userId) {
      return;
    }

    setIsRemoveUserLoading(true);
    const response = await deletePrayerGroupUser(
      prayerGroupId,
      userData.userId
    );

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
      userJoinStatus: JoinStatus.NotJoined,
      prayerGroupRole: undefined,
    });

    setUserData((existingUserData) => {
      const prayerGroups = existingUserData.prayerGroups?.filter(
        (prayerGroup) => prayerGroup.prayerGroupId !== prayerGroupId
      );
      return { ...existingUserData, prayerGroups };
    });
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
    prayerGroupOptionsRef,
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
  };
};
