import * as React from "react";

import { PrayerRequestModel } from "../../types/prayer-request-types";

export type PrayerRequestDetailContextType = {
  prayerRequests: Record<number, PrayerRequestModel>;
  getPrayerRequest: (prayerRequestId: number) => PrayerRequestModel | undefined;
  updatePrayerRequest: (
    prayerRequestId: number,
    prayerRequest: PrayerRequestModel,
  ) => void;
  addPrayerRequests: (prayerRequests: PrayerRequestModel[]) => void;
  clearPrayerRequest: (prayerRequestId: number) => void;
};

export const PrayerRequestDetailContext =
  React.createContext<PrayerRequestDetailContextType>({
    prayerRequests: {},
    getPrayerRequest: () => {},
    updatePrayerRequest: () => {},
    addPrayerRequests: () => {},
    clearPrayerRequest: () => {},
  });
