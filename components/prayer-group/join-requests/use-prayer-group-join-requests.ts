import { debounce } from "lodash";
import * as React from "react";

import { useDeleteJoinRequests } from "../../../api/delete-join-requests";
import { usePostApproveJoinRequests } from "../../../api/post-approve-join-requests";
import { usePostJoinRequestsSearch } from "../../../api/post-join-requests-search";
import { useI18N } from "../../../hooks/use-i18n";
import { LoadStatus } from "../../../types/api-response-types";
import {
  JoinRequestForm,
  JoinRequestModel,
} from "../../../types/join-request-types";
import { DEBOUNCE_TIME } from "../../search/prayer-group-search-constants";
import { useToasterContext } from "../../toasters/toaster-context";
import { usePrayerGroupContext } from "../prayer-group-context";
import { normalizeText } from "../users/prayer-group-user-helpers";
import { JOIN_REQUEST_SORT_CONFIG } from "./join-request-constants";

export const usePrayerGroupJoinRequests = (prayerGroupId: number) => {
  const { translate } = useI18N();
  const { openToaster } = useToasterContext();

  const { setPrayerGroupDetails } = usePrayerGroupContext();

  const [joinRequests, setJoinRequests] = React.useState<JoinRequestModel[]>(
    []
  );
  const [filteredJoinRequests, setFilteredJoinRequests] = React.useState<
    JoinRequestModel[]
  >([]);

  const [joinRequestLoadStatus, setJoinRequestLoadStatus] =
    React.useState<LoadStatus>(LoadStatus.NotStarted);
  const [joinRequestQuery, setJoinRequestQuery] = React.useState<string>();

  const [joinRequestForm, setJoinRequestForm] = React.useState<JoinRequestForm>(
    { approvedJoinRequestIds: [], rejectedJoinRequestIds: [] }
  );

  const [isSaveLoading, setIsSaveLoading] = React.useState<boolean>(false);

  const postJoinRequestsSearch = usePostJoinRequestsSearch();
  const deleteJoinRequests = useDeleteJoinRequests();
  const postApproveJoinRequests = usePostApproveJoinRequests();

  const loadFilteredJoinRequests = React.useCallback(
    (query: string) => {
      const normalizedQuery = normalizeText(query);
      const filteredUsers = joinRequests.filter((joinRequest) => {
        const normalizedFullName = normalizeText(joinRequest.user?.fullName);

        const normalizedUsername = normalizeText(joinRequest.user?.username);

        if (!normalizedFullName || !normalizedUsername) {
          return false;
        }

        return (
          normalizedFullName.includes(normalizedQuery) ||
          normalizedUsername.includes(normalizedQuery)
        );
      });

      setFilteredJoinRequests(filteredUsers);
    },
    [joinRequests]
  );

  const debouncedLoadFilteredJoinRequests = React.useMemo(
    () => debounce(loadFilteredJoinRequests, DEBOUNCE_TIME),
    [loadFilteredJoinRequests]
  );

  const loadJoinRequests = React.useCallback(async () => {
    setJoinRequestLoadStatus(LoadStatus.Loading);

    const response = await postJoinRequestsSearch(
      prayerGroupId,
      JOIN_REQUEST_SORT_CONFIG
    );

    if (response.isError) {
      openToaster({
        message: translate("prayerGroup.joinRequest.unableToLoad"),
        variant: "error",
      });
      setJoinRequestLoadStatus(LoadStatus.Error);
      return;
    }

    setJoinRequests(response.value.joinRequests ?? []);
    setFilteredJoinRequests(response.value.joinRequests ?? []);

    setJoinRequestLoadStatus(LoadStatus.Success);

    setPrayerGroupDetails((prayerGroupDetails) => ({
      ...prayerGroupDetails,
      joinRequestCount: (response.value.joinRequests ?? []).length,
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    postJoinRequestsSearch,
    prayerGroupId,
    setPrayerGroupDetails,
    openToaster,
  ]);

  React.useEffect(() => {
    loadJoinRequests();
  }, [loadJoinRequests, prayerGroupId]);

  const searchJoinRequests = (query: string) => {
    setJoinRequestQuery(query);

    if (query.length === 0) {
      debouncedLoadFilteredJoinRequests.cancel();
      setFilteredJoinRequests(joinRequests);
    }

    debouncedLoadFilteredJoinRequests(query);
  };

  const approveJoinRequest = (joinRequestId: number) => {
    const currentApprovedJoinRequests = joinRequestForm.approvedJoinRequestIds;

    if (currentApprovedJoinRequests.includes(joinRequestId)) {
      return;
    }

    const updatedRejectedJoinRequestIds =
      joinRequestForm.rejectedJoinRequestIds.filter((rejectedJoinRequestId) => {
        return rejectedJoinRequestId !== joinRequestId;
      });

    setJoinRequestForm({
      rejectedJoinRequestIds: updatedRejectedJoinRequestIds,
      approvedJoinRequestIds: currentApprovedJoinRequests.concat(joinRequestId),
    });
  };

  const rejectJoinRequest = (joinRequestId: number) => {
    const rejectedJoinRequestIds = joinRequestForm.rejectedJoinRequestIds ?? [];

    if (rejectedJoinRequestIds.includes(joinRequestId)) {
      return;
    }

    const updatedApprovedJoinRequestIds =
      joinRequestForm.approvedJoinRequestIds.filter((approvedJoinRequestId) => {
        return approvedJoinRequestId !== joinRequestId;
      });

    setJoinRequestForm({
      approvedJoinRequestIds: updatedApprovedJoinRequestIds,
      rejectedJoinRequestIds: rejectedJoinRequestIds.concat(joinRequestId),
    });
  };

  const saveManageJoinRequests = async () => {
    try {
      setIsSaveLoading(true);

      const joinRequestIdsToApprove = joinRequestForm.approvedJoinRequestIds;
      const joinRequestIdsToReject = joinRequestForm.rejectedJoinRequestIds;

      await Promise.all([
        joinRequestIdsToApprove.length > 0
          ? postApproveJoinRequests(prayerGroupId, joinRequestIdsToApprove)
          : undefined,
        joinRequestIdsToReject.length > 0
          ? deleteJoinRequests(prayerGroupId, joinRequestIdsToReject)
          : undefined,
      ]);

      setIsSaveLoading(false);

      const removedJoinRequestsSet = new Set<number>([
        ...joinRequestIdsToApprove,
        ...joinRequestIdsToReject,
      ]);

      const updatedJoinRequests = joinRequests.filter(
        (joinRequest) =>
          !removedJoinRequestsSet.has(joinRequest.joinRequestId ?? -1)
      );

      setJoinRequests(updatedJoinRequests);
      setFilteredJoinRequests(updatedJoinRequests);

      setJoinRequestForm({
        approvedJoinRequestIds: [],
        rejectedJoinRequestIds: [],
      });

      openToaster({
        message: translate("prayerGroup.joinRequest.saved"),
        variant: "success",
      });

      setPrayerGroupDetails((prayerGroupDetails) => ({
        ...prayerGroupDetails,
        joinRequestCount: updatedJoinRequests.length,
      }));
    } catch (error) {
      openToaster({
        message: translate(
          "prayerGroup.joinRequest.unableToSaveJoinRequestUpdates"
        ),
        variant: "error",
      });
    }
  };

  return {
    joinRequests,
    joinRequestLoadStatus,
    loadJoinRequests,
    searchJoinRequests,
    joinRequestQuery,
    filteredJoinRequests,
    joinRequestForm,
    approveJoinRequest,
    rejectJoinRequest,
    isSaveLoading,
    saveManageJoinRequests,
  };
};
