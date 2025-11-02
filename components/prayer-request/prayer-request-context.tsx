import * as React from "react";

import {
  PrayerRequestFilterCriteria,
  PrayerRequestMetadata,
  PrayerRequestModel,
} from "../../types/prayer-request-types";

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
