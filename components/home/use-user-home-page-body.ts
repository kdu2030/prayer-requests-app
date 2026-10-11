import { compact } from "lodash";
import * as React from "react";

import { usePostPrayerRequestFilter } from "../../api/post-prayer-request-filter";
import { useApiDataContext } from "../../hooks/use-api-data";
import { useI18N } from "../../hooks/use-i18n";
import { LoadStatus } from "../../types/api-response-types";
import {
  PrayerRequestFilterCriteria,
  PrayerRequestGetResponse,
  PrayerRequestMetadata,
  PrayerRequestModel,
} from "../../types/prayer-request-types";
import { DEFAULT_PRAYER_REQUEST_FILTERS } from "../prayer-group/prayer-group-constants";
import { getJoinedPrayerGroups } from "../prayer-group/prayer-group-helpers";
import { useGlobalPrayerRequestsContext } from "../prayer-request/global-prayer-requests-context";
import { useToasterContext } from "../toasters/toaster-context";
import { HOME_BASE_PRAYER_REQUEST_FILTERS } from "./home-constants";
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

  const [nextPageLoadStatus, setNextPageLoadStatus] =
    React.useState<LoadStatus>(LoadStatus.NotStarted);

  const postPrayerRequestFilter = usePostPrayerRequestFilter();

  const [isRefreshing, setIsRefreshing] = React.useState<boolean>(false);

  const { openToaster } = useToasterContext();
  const { translate } = useI18N();

  const joinedPrayerGroups = React.useMemo(() => {
    return getJoinedPrayerGroups(userData?.prayerGroups ?? []);
  }, [userData?.prayerGroups]);

  const joinedNoPrayerGroups = joinedPrayerGroups.length === 0;

  const userPrayerGroupIds = React.useMemo(() => {
    return compact(
      joinedPrayerGroups.map((prayerGroup) => prayerGroup.prayerGroupId),
    );
  }, [joinedPrayerGroups]);

  const updatePrayerRequestsData = React.useCallback(
    (prayerRequestResponse: PrayerRequestGetResponse) => {
      setPrayerRequestMetadata({
        totalCount: prayerRequestResponse.totalCount,
        numberOfPages: prayerRequestResponse.numberOfPages,
        prayerRequestsLoaded: prayerRequestResponse.prayerRequests?.length ?? 0,
      });

      const prayerRequestIds =
        prayerRequestResponse.prayerRequests?.reduce(
          (prayerRequestIds: number[], prayerRequest) => {
            if (!prayerRequest.prayerRequestId) {
              return prayerRequestIds;
            }

            return prayerRequestIds.concat(prayerRequest.prayerRequestId);
          },
          [],
        ) ?? [];

      addPrayerRequestsToStore(prayerRequestResponse.prayerRequests ?? []);
      setPrayerRequestIds(prayerRequestIds);
    },
    [addPrayerRequestsToStore],
  );

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
    updatePrayerRequestsData(prayerRequestResponse.value);
  }, [
    joinedPrayerGroups.length,
    postPrayerRequestFilter,
    updatePrayerRequestsData,
    userData?.userId,
    userPrayerGroupIds,
  ]);

  const refreshPrayerRequests = async () => {
    const prayerRequestFilterCriteria: PrayerRequestFilterCriteria = {
      ...prayerRequestFilters,
      pageIndex: 0,
      pageSize: HOME_BASE_PRAYER_REQUEST_FILTERS.pageSize,
      sortConfig:
        prayerRequestFilters?.sortConfig ??
        HOME_BASE_PRAYER_REQUEST_FILTERS.sortConfig,
    };

    setPrayerRequestFilters(prayerRequestFilterCriteria);

    setIsRefreshing(true);

    const response = await postPrayerRequestFilter(prayerRequestFilterCriteria);

    setIsRefreshing(false);

    if (response.isError) {
      openToaster({
        message: translate("toaster.prayerRequestsRefresh.failure"),
        variant: "success",
      });
      return;
    }

    updatePrayerRequestsData(response.value);
  };

  React.useEffect(() => {
    initializePrayerRequests();
  }, [initializePrayerRequests]);

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

  const prayerRequestsLeftToLoad =
    (prayerRequestMetadata?.totalCount ?? 0) -
    (prayerRequestMetadata?.prayerRequestsLoaded ?? 0);

  const loadPrayerRequestsWhenEndReached = async () => {
    if (
      nextPageLoadStatus === LoadStatus.Loading ||
      nextPageLoadStatus === LoadStatus.Error
    ) {
      return;
    }

    if (prayerRequestsLeftToLoad <= 0) {
      return;
    }

    const nextPageFilterCriteria: PrayerRequestFilterCriteria = {
      ...prayerRequestFilters,
      pageIndex: (prayerRequestFilters?.pageIndex ?? 0) + 1,
      sortConfig:
        prayerRequestFilters?.sortConfig ??
        DEFAULT_PRAYER_REQUEST_FILTERS.sortConfig,
    };

    setNextPageLoadStatus(LoadStatus.Loading);

    const response = await postPrayerRequestFilter(nextPageFilterCriteria);

    if (response.isError) {
      openToaster({
        message: translate("prayerRequest.loading.failure"),
        variant: "error",
      });

      setNextPageLoadStatus(LoadStatus.Error);
      return;
    }

    setNextPageLoadStatus(LoadStatus.Success);

    const prayerRequestResponse = response.value;

    setPrayerRequestMetadata({
      totalCount: prayerRequestResponse.totalCount,
      numberOfPages: prayerRequestResponse.numberOfPages,
      prayerRequestsLoaded:
        (prayerRequestMetadata?.prayerRequestsLoaded ?? 0) +
        (prayerRequestResponse.prayerRequests?.length ?? 0),
    });

    const nextPagePrayerRequestIds =
      prayerRequestResponse.prayerRequests?.reduce(
        (prayerRequestIds: number[], prayerRequest) => {
          if (!prayerRequest.prayerRequestId) {
            return prayerRequestIds;
          }

          return prayerRequestIds.concat(prayerRequest.prayerRequestId);
        },
        [],
      ) ?? [];

    addPrayerRequestsToStore(prayerRequestResponse.prayerRequests ?? []);
    setPrayerRequestIds(prayerRequestIds.concat(nextPagePrayerRequestIds));
  };

  return {
    homePageLoadStatus,
    joinedPrayerGroups,
    joinedNoPrayerGroups,
    loadedPrayerRequests,
    setPrayerRequestIds,
    prayerRequestFilters,
    prayerRequestMetadata,
    initializePrayerRequests,
    prayerRequestIds,
    refreshPrayerRequests,
    isRefreshing,
    loadPrayerRequestsWhenEndReached,
    nextPageLoadStatus,
    prayerRequestsLeftToLoad,
  };
};
