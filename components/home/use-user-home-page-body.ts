import { compact } from "lodash";
import * as React from "react";

import { usePostPrayerRequestFilter } from "../../api/post-prayer-request-filter";
import { useApiDataContext } from "../../hooks/use-api-data";
import { LoadStatus } from "../../types/api-response-types";
import {
  PrayerRequestFilterCriteria,
  PrayerRequestMetadata,
  PrayerRequestModel,
} from "../../types/prayer-request-types";
import { getJoinedPrayerGroups } from "../prayer-group/prayer-group-helpers";
import { useGlobalPrayerRequestsContext } from "../prayer-request/global-prayer-requests-context";
import { getHomePrayerRequestFilterCriteria } from "./home-helpers";

export const useUserHomePageBody = () => {
  const { userData } = useApiDataContext();
  const [prayerRequestIds, setPrayerRequestIds] = React.useState<number[]>([]);
  const { getPrayerRequestFromStore, addPrayerRequestsToStore } =
    useGlobalPrayerRequestsContext();

  const [prayerRequestFilters, setPrayerRequestFilters] = React.useState<
    PrayerRequestFilterCriteria | undefined
  >();

  const [prayerRequestMetadata, setPrayerRequestMetadata] = React.useState<
    PrayerRequestMetadata | undefined
  >();

  const [homePageLoadStatus, setHomePageLoadStatus] =
    React.useState<LoadStatus>(LoadStatus.NotStarted);

  const postPrayerRequestFilter = usePostPrayerRequestFilter();

  const joinedPrayerGroups = React.useMemo(() => {
    return getJoinedPrayerGroups(userData?.prayerGroups ?? []);
  }, [userData?.prayerGroups]);

  const joinedNoPrayerGroups = joinedPrayerGroups.length === 0;

  const userPrayerGroupIds = React.useMemo(() => {
    return compact(
      joinedPrayerGroups.map((prayerGroup) => prayerGroup.prayerGroupId),
    );
  }, [joinedPrayerGroups]);

  const initializePrayerRequests = React.useCallback(async () => {
    if (joinedPrayerGroups.length === 0 || !userData?.userId) {
      return;
    }

    setHomePageLoadStatus(LoadStatus.Loading);

    const initialFilterCriteria = getHomePrayerRequestFilterCriteria(
      0,
      userPrayerGroupIds,
      userData.userId,
    );

    setPrayerRequestFilters(initialFilterCriteria);

    const prayerRequestResponse = await postPrayerRequestFilter(
      initialFilterCriteria,
    );

    if (prayerRequestResponse.isError) {
      setHomePageLoadStatus(LoadStatus.Error);
      return;
    }

    setHomePageLoadStatus(LoadStatus.Success);

    setPrayerRequestFilters(initialFilterCriteria);
    setPrayerRequestMetadata({
      totalCount: prayerRequestResponse.value.totalCount,
      numberOfPages: prayerRequestResponse.value.numberOfPages,
      pageIndex: 0,
    });

    const prayerRequestIds =
      prayerRequestResponse.value.prayerRequests?.reduce(
        (prayerRequestIds: number[], prayerRequest) => {
          if (!prayerRequest.prayerRequestId) {
            return prayerRequestIds;
          }

          return prayerRequestIds.concat(prayerRequest.prayerRequestId);
        },
        [],
      ) ?? [];

    addPrayerRequestsToStore(prayerRequestResponse.value.prayerRequests ?? []);
    setPrayerRequestIds(prayerRequestIds);
  }, [
    addPrayerRequestsToStore,
    joinedPrayerGroups.length,
    postPrayerRequestFilter,
    userData?.userId,
    userPrayerGroupIds,
  ]);

  const loadedPrayerRequests = React.useMemo(() => {
    return prayerRequestIds.reduce(
      (prayerRequests: PrayerRequestModel[], prayerRequestId) => {
        const prayerRequest = getPrayerRequestFromStore(prayerRequestId);
        if (!prayerRequest) {
          return prayerRequests;
        }

        prayerRequests.push(prayerRequest);
        return prayerRequests;
      },
      [],
    );
  }, [getPrayerRequestFromStore, prayerRequestIds]);

  return {
    homePageLoadStatus,
    joinedPrayerGroups,
    joinedNoPrayerGroups,
    loadedPrayerRequests,
    setPrayerRequestIds,
    prayerRequestFilters,
    prayerRequestMetadata,
    initializePrayerRequests,
    prayerRequestIds
  };
};
