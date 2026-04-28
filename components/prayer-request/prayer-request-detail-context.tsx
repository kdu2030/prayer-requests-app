import * as React from "react";

import { PrayerRequestModel } from "../../types/prayer-request-types";

export type PrayerRequestDetailContextType = {
  prayerRequests: Record<number, PrayerRequestModel>;
  getPrayerRequestById: (
    prayerRequestId: number,
  ) => PrayerRequestModel | undefined;
  updatePrayerRequest: (
    prayerRequestId: number,
    prayerRequest: PrayerRequestModel,
  ) => void;
  addPrayerRequests: (prayerRequests: PrayerRequestModel[]) => void;
  clearPrayerRequest: (prayerRequestId: number) => void;
};
