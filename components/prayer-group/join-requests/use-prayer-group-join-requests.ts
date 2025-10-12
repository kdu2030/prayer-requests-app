import { debounce } from "lodash";
import * as React from "react";

import { usePostJoinRequestsSearch } from "../../../api/post-join-requests-search";
import { LoadStatus } from "../../../types/api-response-types";
import { JoinRequestModel } from "../../../types/join-request-types";
import { DEBOUNCE_TIME } from "../../search/prayer-group-search-constants";
import { normalizeText } from "../users/prayer-group-user-helpers";
import { JOIN_REQUEST_SORT_CONFIG } from "./join-request-constants";

export const usePrayerGroupJoinRequests = (prayerGroupId: number) => {
  const [joinRequests, setJoinRequests] = React.useState<JoinRequestModel[]>(
    []
  );
  const [filteredJoinRequests, setFilteredJoinRequests] = React.useState<
    JoinRequestModel[]
  >([]);

  const [joinRequestLoadStatus, setJoinRequestLoadStatus] =
    React.useState<LoadStatus>(LoadStatus.NotStarted);
  const [joinRequestQuery, setJoinRequestQuery] = React.useState<string>();

  const postJoinRequestsSearch = usePostJoinRequestsSearch();

  const loadFilteredJoinRequests = React.useCallback(
    (query: string) => {
      const normalizedQuery = normalizeText(query);
      const filteredUsers = joinRequests.filter((joinRequest) => {
        const normalizedFullName = normalizeText(
          joinRequest.userSummary?.fullName
        );

        const normalizedUsername = normalizeText(
          joinRequest.userSummary?.username
        );

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
      setJoinRequestLoadStatus(LoadStatus.Error);
      return;
    }

    setJoinRequests(response.value.joinRequests ?? []);
    setFilteredJoinRequests(response.value.joinRequests ?? []);

    setJoinRequestLoadStatus(LoadStatus.Success);
  }, [prayerGroupId, postJoinRequestsSearch]);

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

  return {
    joinRequests,
    joinRequestLoadStatus,
    loadJoinRequests,
    searchJoinRequests,
    joinRequestQuery,
    filteredJoinRequests,
  };
};
