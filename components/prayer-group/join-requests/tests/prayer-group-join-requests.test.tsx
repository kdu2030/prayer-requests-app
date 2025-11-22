import "@testing-library/jest-native/extend-expect";
import "@testing-library/jest-native";

import { RenderResult, waitFor } from "@testing-library/react-native";
import * as React from "react";

import { PostJoinRequestsSearchResponse } from "../../../../api/post-join-requests-search";
import { mountComponent } from "../../../../tests/utils/test-utils";
import { SortConfig, SortOrder } from "../../../../types/api-response-types";
import { ManagedErrorResponse } from "../../../../types/error-handling";
import { PrayerRequestContextProvider } from "../../../prayer-request/prayer-request-context";
import { PrayerGroupContextProvider } from "../../prayer-group-context";
import { PrayerGroupJoinRequests } from "../prayer-group-join-requests";
import { mockJoinRequests } from "./mock-data";
import { JoinRequestTestIds } from "./test-id";

const mockPostJoinRequestsSearch = jest.fn();

const mockPostJoinRequestsSearchCallback = jest.fn(
  (prayerGroupId: number, sortConfig: SortConfig) =>
    mockPostJoinRequestsSearch(prayerGroupId, sortConfig)
);

let component: RenderResult;

jest.mock("../../../../api/post-join-requests-search", () => ({
  usePostJoinRequestsSearch: () => mockPostJoinRequestsSearchCallback,
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

  test("Join requests are fetched on initial mount", async () => {
    const joinRequestsResponse: ManagedErrorResponse<PostJoinRequestsSearchResponse> =
      {
        isError: false,
        value: {
          joinRequests: mockJoinRequests,
        },
      };

    mockPostJoinRequestsSearch.mockReturnValue(joinRequestsResponse);
    component = mountPrayerGroupJoinRequests(1);

    const expectedSortConfig: SortConfig = {
      sortField: "SUBMITTED_DATE",
      sortDirection: SortOrder.Descending,
    };

    const expectedJoinRequestUsername = mockJoinRequests[0].user.username;
    const joinRequestUsername = await component.findByTestId(
      `${JoinRequestTestIds.usernameValue}[0]`
    );

    await waitFor(() => {
      expect(mockPostJoinRequestsSearch).toHaveBeenCalledWith(
        1,
        expectedSortConfig
      );

      expect(joinRequestUsername).toHaveTextContent(
        expectedJoinRequestUsername
      );
    });
  });
});
