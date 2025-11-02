import * as React from "react";

import { usePostPrayerRequestFilter } from "../../api/post-prayer-request-filter";
import { useApiDataContext } from "../../hooks/use-api-data";
import { useI18N } from "../../hooks/use-i18n";
import { LoadStatus } from "../../types/api-response-types";
import {
  PrayerRequestFilterCriteria,
  PrayerRequestMetadata,
  PrayerRequestModel,
} from "../../types/prayer-request-types";
import {
  DEFAULT_PRAYER_REQUEST_FILTERS,
  DEFAULT_PRAYER_REQUEST_METADATA,
} from "../prayer-group/prayer-group-constants";
import { useToasterContext } from "../toasters/toaster-context";

export type PrayerRequestContextType = {
  prayerRequestFilters: PrayerRequestFilterCriteria;
  setPrayerRequestFilters: React.Dispatch<
    React.SetStateAction<PrayerRequestFilterCriteria>
  >;
  prayerRequests: PrayerRequestModel[];
  setPrayerRequests: React.Dispatch<React.SetStateAction<PrayerRequestModel[]>>;
  prayerRequestMetadata: PrayerRequestMetadata;
  setPrayerRequestMetadata: React.Dispatch<
    React.SetStateAction<PrayerRequestMetadata>
  >;
  prayerRequestLoadStatus: LoadStatus;
  setPrayerRequestLoadStatus: React.Dispatch<React.SetStateAction<LoadStatus>>;
  nextPrayerRequestsLoadStatus: LoadStatus;
  setNextPrayerRequestsLoadStatus: React.Dispatch<
    React.SetStateAction<LoadStatus>
  >;
  cleanupPrayerRequests: () => void;
  loadNextPrayerRequestsForGroup: (
    prayerGroupId: number,
    showCompleteSpinner: boolean,
    customFilters?: PrayerRequestFilterCriteria
  ) => void;
};

const PrayerRequestContext = React.createContext<PrayerRequestContextType>({
  prayerRequestFilters: DEFAULT_PRAYER_REQUEST_FILTERS,
  setPrayerRequestFilters: () => {},
  prayerRequests: [],
  setPrayerRequests: () => {},
  prayerRequestMetadata: DEFAULT_PRAYER_REQUEST_METADATA,
  setPrayerRequestMetadata: () => {},
  prayerRequestLoadStatus: LoadStatus.NotStarted,
  setPrayerRequestLoadStatus: () => {},
  nextPrayerRequestsLoadStatus: LoadStatus.NotStarted,
  setNextPrayerRequestsLoadStatus: () => {},
  cleanupPrayerRequests: () => {},
  loadNextPrayerRequestsForGroup: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const PrayerRequestContextProvider: React.FC<Props> = ({ children }) => {
  const [prayerRequestFilters, setPrayerRequestFilters] =
    React.useState<PrayerRequestFilterCriteria>(DEFAULT_PRAYER_REQUEST_FILTERS);
  const [prayerRequests, setPrayerRequests] = React.useState<
    PrayerRequestModel[]
  >([]);
  const [prayerRequestMetadata, setPrayerRequestMetadata] =
    React.useState<PrayerRequestMetadata>(DEFAULT_PRAYER_REQUEST_METADATA);
  const [prayerRequestLoadStatus, setPrayerRequestLoadStatus] =
    React.useState<LoadStatus>(LoadStatus.NotStarted);
  const [nextPrayerRequestsLoadStatus, setNextPrayerRequestsLoadStatus] =
    React.useState<LoadStatus>(LoadStatus.NotStarted);

  const { translate } = useI18N();

  const { openToaster } = useToasterContext();
  const { userData } = useApiDataContext();

  const postPrayerRequestFilter = usePostPrayerRequestFilter();

  const cleanupPrayerRequests = async () => {
    setPrayerRequestFilters(DEFAULT_PRAYER_REQUEST_FILTERS);
    setPrayerRequests([]);
    setPrayerRequestMetadata(DEFAULT_PRAYER_REQUEST_METADATA);
  };

  const loadNextPrayerRequestsForGroup = async (
    prayerGroupId: number,
    showCompleteSpinner: boolean,
    customFilters?: PrayerRequestFilterCriteria
  ) => {
    const setLoadStatus = showCompleteSpinner
      ? setPrayerRequestLoadStatus
      : setNextPrayerRequestsLoadStatus;

    const filters = customFilters ?? prayerRequestFilters;

    if (!userData?.userId) {
      return;
    }

    setLoadStatus(LoadStatus.Loading);

    const response = await postPrayerRequestFilter({
      ...filters,
      prayerGroupIds: [prayerGroupId],
    });

    if (response.isError && showCompleteSpinner) {
      setLoadStatus(LoadStatus.Error);
      setPrayerRequests([]);
      return;
    } else if (response.isError) {
      setLoadStatus(LoadStatus.Error);
      openToaster({
        message: translate("prayerRequest.loading.failure"),
        variant: "error",
      });
      return;
    }

    // Since prayer requests can be infinitely scrolled
    // We don't want to get rid of the current existing prayer requests unless group ID changes.
    setPrayerRequests((existingRequests) => [
      ...existingRequests,
      ...(response.value.prayerRequests ?? []),
    ]);

    setPrayerRequestMetadata({
      pageIndex: response.value.pageIndex,
      numberOfPages: response.value.numberOfPages,
      totalCount: response.value.totalCount,
    });

    setLoadStatus(LoadStatus.Success);
  };

  return (
    <PrayerRequestContext.Provider
      value={{
        prayerRequestFilters,
        setPrayerRequestFilters,
        prayerRequests,
        setPrayerRequests,
        prayerRequestMetadata,
        setPrayerRequestMetadata,
        prayerRequestLoadStatus,
        setPrayerRequestLoadStatus,
        nextPrayerRequestsLoadStatus,
        setNextPrayerRequestsLoadStatus,
        cleanupPrayerRequests,
        loadNextPrayerRequestsForGroup,
      }}
    >
      {children}
    </PrayerRequestContext.Provider>
  );
};

export const usePrayerRequestContext = () =>
  React.useContext(PrayerRequestContext);
