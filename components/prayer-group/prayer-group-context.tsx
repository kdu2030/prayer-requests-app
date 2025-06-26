import * as React from "react";

import { usePostPrayerRequestFilter } from "../../api/post-prayer-request-filter";
import { useApiDataContext } from "../../hooks/use-api-data";
import { mapPrayerRequests } from "../../mappers/map-prayer-request";
import { PrayerGroupDetails } from "../../types/prayer-group-types";
import {
  PrayerRequestFilterCriteria,
  PrayerRequestModel,
} from "../../types/prayer-request-types";
import { DEFAULT_PRAYER_REQUEST_FILTERS } from "./prayer-group-constants";

export type PrayerGroupContextType = {
  prayerGroupDetails?: PrayerGroupDetails;
  setPrayerGroupDetails: React.Dispatch<
    React.SetStateAction<PrayerGroupDetails | undefined>
  >;
  prayerRequestFilters: Omit<PrayerRequestFilterCriteria, "prayerGroupIds">;
  setPrayerRequestFilters: React.Dispatch<
    React.SetStateAction<Omit<PrayerRequestFilterCriteria, "prayerGroupIds">>
  >;
  prayerRequests: PrayerRequestModel[];
  setPrayerRequests: React.Dispatch<React.SetStateAction<PrayerRequestModel[]>>;
  areRequestsLoading: boolean;
  setAreRequestsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  areNextRequestsLoading: boolean;
  setAreNextRequestsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  loadNextPrayerRequestsForGroup: (
    prayerGroupId: number,
    showCOmpleteSpinner: boolean,
    customFilters?: PrayerRequestFilterCriteria
  ) => Promise<void>;
  cleanupPrayerRequests: () => void;
};

const DEFAULT_PRAYER_GROUP_CONTEXT: PrayerGroupContextType = {
  setPrayerGroupDetails: () => {},
  prayerRequestFilters: DEFAULT_PRAYER_REQUEST_FILTERS,
  setPrayerRequestFilters: () => {},
  prayerRequests: [],
  setPrayerRequests: () => {},
  areRequestsLoading: false,
  setAreRequestsLoading: () => {},
  loadNextPrayerRequestsForGroup: async () => {},
  cleanupPrayerRequests: () => {},
  areNextRequestsLoading: false,
  setAreNextRequestsLoading: () => {},
};

const PrayerGroupContext = React.createContext<PrayerGroupContextType>(
  DEFAULT_PRAYER_GROUP_CONTEXT
);

type Props = {
  children: React.ReactNode;
};

export const PrayerGroupContextProvider: React.FC<Props> = ({ children }) => {
  const [prayerGroupDetails, setPrayerGroupDetails] = React.useState<
    PrayerGroupDetails | undefined
  >();

  const [prayerRequestFilters, setPrayerRequestFilters] = React.useState<
    Omit<PrayerRequestFilterCriteria, "prayerGroupIds">
  >(DEFAULT_PRAYER_REQUEST_FILTERS);

  const [prayerRequestGroupId, setPrayerRequestGroupId] =
    React.useState<number>();
  const [prayerRequests, setPrayerRequests] = React.useState<
    PrayerRequestModel[]
  >([]);

  const [areRequestsLoading, setAreRequestsLoading] =
    React.useState<boolean>(false);
  const [areNextRequestsLoading, setAreNextRequestsLoading] =
    React.useState<boolean>(false);

  const { userData } = useApiDataContext();

  const postPrayerRequestFilter = usePostPrayerRequestFilter();

  const cleanupPrayerRequests = async () => {
    setPrayerRequestFilters(DEFAULT_PRAYER_REQUEST_FILTERS);
    setPrayerRequests([]);
  };

  const loadNextPrayerRequestsForGroup = async (
    prayerGroupId: number,
    showCompleteSpinner: boolean,
    customFilters?: PrayerRequestFilterCriteria
  ) => {
    const setShowSpinner = showCompleteSpinner
      ? setAreRequestsLoading
      : setAreNextRequestsLoading;

    if (prayerRequestGroupId !== prayerGroupId) {
      cleanupPrayerRequests();
    }

    setPrayerRequestGroupId(prayerGroupId);
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
      ...mapPrayerRequests(response.value),
    ]);
  };

  return (
    <PrayerGroupContext.Provider
      value={{
        prayerGroupDetails,
        setPrayerGroupDetails,
        prayerRequestFilters,
        setPrayerRequestFilters,
        prayerRequests,
        setPrayerRequests,
        areRequestsLoading,
        setAreRequestsLoading,
        loadNextPrayerRequestsForGroup,
        cleanupPrayerRequests,
        areNextRequestsLoading,
        setAreNextRequestsLoading,
      }}
    >
      {children}
    </PrayerGroupContext.Provider>
  );
};

export const usePrayerGroupContext = () => React.useContext(PrayerGroupContext);
