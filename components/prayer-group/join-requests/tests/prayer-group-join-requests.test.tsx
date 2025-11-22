import "@testing-library/jest-native/extend-expect";
import "@testing-library/jest-native";

import {
  act,
  fireEvent,
  RenderResult,
  waitFor,
} from "@testing-library/react-native";
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

const mockPostApproveJoinRequests = jest.fn();

const mockPostApproveJoinRequestsCallback = jest.fn(
  (prayerGroupId: number, joinRequestIds: number[]) =>
    mockPostApproveJoinRequests(prayerGroupId, joinRequestIds)
);

const mockDeleteJoinRequests = jest.fn();

const mockDeleteJoinRequestsCallback = jest.fn(
  (prayerGroupId: number, joinRequestIds: number[]) =>
    mockDeleteJoinRequests(prayerGroupId, joinRequestIds)
);

let component: RenderResult;

jest.mock("../../../../api/post-join-requests-search", () => ({
  usePostJoinRequestsSearch: () => mockPostJoinRequestsSearchCallback,
}));

jest.mock("../../../../api/post-approve-join-requests", () => ({
  usePostApproveJoinRequests: () => mockPostApproveJoinRequestsCallback,
}));

jest.mock("../../../../api/delete-join-requests", () => ({
  useDeleteJoinRequests: () => mockDeleteJoinRequestsCallback,
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
    jest.clearAllMocks();
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

  test("Join requests are searchable by username", async () => {
    jest.useFakeTimers();

    const joinRequestsResponse: ManagedErrorResponse<PostJoinRequestsSearchResponse> =
      {
        isError: false,
        value: {
          joinRequests: mockJoinRequests,
        },
      };

    mockPostJoinRequestsSearch.mockReturnValue(joinRequestsResponse);
    component = mountPrayerGroupJoinRequests(1);

    const searchInput = await component.findByTestId(
      JoinRequestTestIds.joinRequestSearchInput
    );

    fireEvent.changeText(searchInput, "dmeagle");
    await act(() => jest.runAllTimers());

    const usernameValue = await component.findByTestId(
      `${JoinRequestTestIds.usernameValue}[0]`
    );

    expect(usernameValue).toHaveTextContent(mockJoinRequests[1].user.username);

    jest.useRealTimers();
  });

  test("After approving join requests and saving, approved join request is no longer visible", async () => {
    const joinRequestsResponse: ManagedErrorResponse<PostJoinRequestsSearchResponse> =
      {
        isError: false,
        value: {
          joinRequests: mockJoinRequests,
        },
      };

    mockPostJoinRequestsSearch.mockReturnValue(joinRequestsResponse);
    mockPostApproveJoinRequests.mockReturnValue({ isError: false });

    component = mountPrayerGroupJoinRequests(1);

    const approveButton = await component.findByTestId(
      `${JoinRequestTestIds.approveButton}[0]`
    );

    await act(() => fireEvent.press(approveButton));

    const saveButton = await component.findByTestId(
      JoinRequestTestIds.saveButton
    );

    await act(() => fireEvent.press(saveButton));

    const remainingJoinRequestFullName = await component.findByTestId(
      `${JoinRequestTestIds.fullNameValue}[0]`
    );

    expect(mockPostApproveJoinRequests).toHaveBeenCalledWith(1, [
      mockJoinRequests[0].joinRequestId,
    ]);
    expect(mockDeleteJoinRequests).not.toHaveBeenCalled();

    expect(remainingJoinRequestFullName).toHaveTextContent(
      mockJoinRequests[1].user.fullName
    );
  });
});
