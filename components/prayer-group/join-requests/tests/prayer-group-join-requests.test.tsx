import * as React from "react";

import { SortConfig } from "../../../../types/api-response-types";
import { PrayerRequestContextProvider } from "../../../prayer-request/prayer-request-context";
import { PrayerGroupContextProvider } from "../../prayer-group-context";
import { PrayerGroupJoinRequests } from "../prayer-group-join-requests";

const mockPostJoinRequestsSearch = jest.fn();

jest.mock("../../../../api/post-join-requests-search", () => ({
  usePostJoinRequestsSearch:
    () => (prayerGroupId: number, sortConfig: SortConfig) =>
      mockPostJoinRequestsSearch(prayerGroupId, sortConfig),
}));

const mountPrayerGroupJoinRequests = (prayerGroupId: number) => {
  return (
    <PrayerGroupContextProvider>
      <PrayerRequestContextProvider>
        <PrayerGroupJoinRequests prayerGroupId={prayerGroupId} />
      </PrayerRequestContextProvider>
    </PrayerGroupContextProvider>
  );
};
