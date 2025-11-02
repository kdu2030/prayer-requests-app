import * as React from "react";

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
};

const PrayerRequestContext = React.createContext<PrayerRequestContextType>({
  prayerRequestFilters: DEFAULT_PRAYER_REQUEST_FILTERS,
  setPrayerRequestFilters: () => {},
  prayerRequests: [],
  setPrayerRequests: () => {},
  prayerRequestMetadata: DEFAULT_PRAYER_REQUEST_METADATA,
  setPrayerRequestMetadata: () => {},
});
