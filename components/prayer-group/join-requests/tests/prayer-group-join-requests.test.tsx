import { RenderResult } from "@testing-library/react-native";
import * as React from "react";

import { PostJoinRequestsSearchResponse } from "../../../../api/post-join-requests-search";
import { mountComponent } from "../../../../tests/utils/test-utils";
import { SortConfig } from "../../../../types/api-response-types";
import { ManagedErrorResponse } from "../../../../types/error-handling";
import { PrayerRequestContextProvider } from "../../../prayer-request/prayer-request-context";
import { PrayerGroupContextProvider } from "../../prayer-group-context";
import { PrayerGroupJoinRequests } from "../prayer-group-join-requests";
import { mockJoinRequests } from "./mock-data";

const mockPostJoinRequestsSearch = jest.fn();

let component: RenderResult;

jest.mock("../../../../api/post-join-requests-search", () => ({
  usePostJoinRequestsSearch:
    () => (prayerGroupId: number, sortConfig: SortConfig) =>
      mockPostJoinRequestsSearch(prayerGroupId, sortConfig),
}));

const mountPrayerGroupJoinRequests = (prayerGroupId: number) => {
  return mountComponent(
    <PrayerGroupContextProvider>
      <PrayerRequestContextProvider>
        <PrayerGroupJoinRequests prayerGroupId={prayerGroupId} />
      </PrayerRequestContextProvider>
    </PrayerGroupContextProvider>
  );
};

describe(PrayerGroupJoinRequests, () => {
  afterEach(() => {
    component?.unmount();
  });

  test("Join requests are fetched on initial mount", () => {
    const joinRequestsResponse: ManagedErrorResponse<PostJoinRequestsSearchResponse> =
      {
        isError: false,
        value: {
          joinRequests: mockJoinRequests,
        },
      };

    mockPostJoinRequestsSearch.mockReturnValue(joinRequestsResponse);
    component = mountPrayerGroupJoinRequests(1);
  });
});
