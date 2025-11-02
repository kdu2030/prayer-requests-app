import * as React from "react";

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
      }}
    >
      {children}
    </PrayerRequestContext.Provider>
  );
};

export const usePrayerRequestContext = () =>
  React.useContext(PrayerRequestContext);
