import { BottomSheetProps } from "@gorhom/bottom-sheet";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { router } from "expo-router";
import * as React from "react";

import { useDeletePrayerGroupUser } from "../../api/delete-prayer-group-user";
import { useGetPrayerGroup } from "../../api/get-prayer-group";
import { usePostPrayerGroupUser } from "../../api/post-prayer-group-user";
import {
  JoinStatus,
  PrayerGroupRole,
  VisibilityLevel,
} from "../../constants/prayer-group-constants";
import { useApiDataContext } from "../../hooks/use-api-data";
import { useI18N } from "../../hooks/use-i18n";
import { LoadStatus } from "../../types/api-response-types";
import { PrayerGroupSummary } from "../../types/prayer-group-types";
import { PrayerRequestFilterCriteria } from "../../types/prayer-request-types";
import { usePrayerRequestContext } from "../prayer-request/prayer-request-context";
import { useToasterContext } from "../toasters/toaster-context";
import { DEFAULT_PRAYER_REQUEST_FILTERS } from "./prayer-group-constants";
import { usePrayerGroupContext } from "./prayer-group-context";

export const usePrayerGroup = (prayerGroupId: number) => {
  const [prayerGroupLoadStatus, setPrayerGroupLoadStatus] =
    React.useState<LoadStatus>(LoadStatus.NotStarted);
  const [showLeavePrayerGroupModal, setShowLeavePrayerGroupModal] =
    React.useState<boolean>(false);

  const {
    prayerRequestFilters,
    setPrayerRequestFilters,
    prayerRequestIds,
    prayerRequestMetadata,
    cleanupPrayerRequests,
    loadNextPrayerRequestsForGroup,
    prayerRequestLoadStatus,
    nextPrayerRequestsLoadStatus,
    numNotLoadedRequests,
  } = usePrayerRequestContext();

  const { prayerGroupDetails, setPrayerGroupDetails } = usePrayerGroupContext();

  const [isRemoveUserLoading, setIsRemoveUserLoading] =
    React.useState<boolean>(false);
  const [isAddUserLoading, setIsAddUserLoading] =
    React.useState<boolean>(false);

  const { openToaster } = useToasterContext();

  const prayerGroupOptionsRef = React.useRef<
    BottomSheetProps & BottomSheetMethods
  >(null);

  const { userData, setUserData } = useApiDataContext();

  const getPrayerGroup = useGetPrayerGroup();
  const deletePrayerGroupUser = useDeletePrayerGroupUser();
  const postPrayerGroupUser = usePostPrayerGroupUser();

  const { translate } = useI18N();

  const loadPrayerGroup = async () => {
    setPrayerGroupDetails(undefined);
    setPrayerGroupLoadStatus(LoadStatus.Loading);

    const response = await getPrayerGroup(prayerGroupId);

    if (response.isError) {
      setPrayerGroupLoadStatus(LoadStatus.Error);
      return;
    }

    setPrayerGroupLoadStatus(LoadStatus.Success);

    if (response.value.prayerGroupId !== prayerGroupId) {
      // This could happen if the user switches prayer groups in the middle of loading
      return;
    }

    setPrayerGroupDetails(response.value);
    return response.value;
  };

  const loadPrayerGroupData = async () => {
    cleanupPrayerRequests();

    const prayerGroupDetails = await loadPrayerGroup();

    if (
      prayerGroupDetails?.visibilityLevel === VisibilityLevel.Private &&
      prayerGroupDetails.userJoinStatus !== JoinStatus.Joined
    ) {
      return;
    }

    await loadNextPrayerRequestsForGroup(
      prayerGroupId,
      true,
      DEFAULT_PRAYER_REQUEST_FILTERS,
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
      openToaster({
        message: translate("toaster.joinPrayerGroup.failure"),
        variant: "error",
      });

      return;
    }

    openToaster({
      message: translate("toaster.joinPrayerGroup.success"),
      variant: "success",
    });

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
        joinedPrayerGroupSummary,
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
      userData.userId,
    );

    setIsRemoveUserLoading(false);

    if (response.isError) {
      openToaster({
        message: translate("prayerGroup.actions.leavePrayerGroup.failure"),
        variant: "error",
      });

      return;
    }

    openToaster({
      message: translate("prayerGroup.actions.leavePrayerGroup.success"),
      variant: "success",
    });

    setPrayerGroupDetails({
      ...prayerGroupDetails,
      userJoinStatus: JoinStatus.NotJoined,
      prayerGroupRole: undefined,
    });

    setUserData((existingUserData) => {
      const prayerGroups = existingUserData.prayerGroups?.filter(
        (prayerGroup) => prayerGroup.prayerGroupId !== prayerGroupId,
      );
      return { ...existingUserData, prayerGroups };
    });

    setShowLeavePrayerGroupModal(false);
  };

  const onRetry = () => {
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
      nextPrayerRequestsLoadStatus === LoadStatus.Loading ||
      prayerRequestLoadStatus === LoadStatus.Loading
    ) {
      return;
    }

    if (
      prayerRequestMetadata.totalCount == null ||
      prayerRequestIds.length >= prayerRequestMetadata.totalCount
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
      updatedPrayerRequestFilters,
    );
  };

  const showPrayerRequestList = React.useMemo(() => {
    return (
      prayerRequestLoadStatus === LoadStatus.Success &&
      prayerRequestIds.length > 0
    );
  }, [prayerRequestLoadStatus, prayerRequestIds.length]);

  const setUserJoinStatus = (joinStatus: JoinStatus) => {
    setPrayerGroupDetails((prayerGroupDetails) => ({
      ...prayerGroupDetails,
      userJoinStatus: joinStatus,
    }));
  };

  const navigateToPrayerRequestPage = (
    prayerRequestId: number,
    scrollToCommentsOnLoad: boolean = false,
  ) => {
    if (!prayerGroupDetails?.prayerGroupId) {
      return;
    }

    router.push({
      pathname: "/prayergroup/[id]/prayerrequest/[id]",
      params: {
        id: prayerGroupDetails.prayerGroupId,
        id_1: prayerRequestId,
        scrollToCommentsOnLoad: scrollToCommentsOnLoad.toString(),
      },
    });
  };

  return {
    prayerGroupLoadStatus,
    setPrayerGroupLoadStatus,
    onRemoveUser,
    isRemoveUserLoading,
    onAddUser,
    isAddUserLoading,
    onRetry,
    prayerGroupOptionsRef,
    onOpenOptions,
    prayerRequestFilters,
    setPrayerRequestFilters,
    onEndReached,
    loadNextPrayerRequestsForGroup,
    nextPrayerRequestsLoadStatus,
    prayerRequestLoadStatus,
    showPrayerRequestList,
    showLeavePrayerGroupModal,
    setShowLeavePrayerGroupModal,
    setUserJoinStatus,
    numNotLoadedRequests,
    navigateToPrayerRequestPage,
  };
};
