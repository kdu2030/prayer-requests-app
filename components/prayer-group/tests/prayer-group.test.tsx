import "@testing-library/jest-native/extend-expect";
import "@testing-library/jest-native";

import mockAsyncStorage from "@react-native-async-storage/async-storage/jest/async-storage-mock";
import {
  fireEvent,
  RenderResult,
  waitFor,
} from "@testing-library/react-native";

import { PrayerGroupUserToAdd } from "../../../api/post-prayer-group-users";
import {
  JoinStatus,
  PrayerGroupRole,
} from "../../../constants/prayer-group-constants";
import { mountComponent } from "../../../tests/utils/test-utils";
import { SortOrder } from "../../../types/api-response-types";
import { ManagedErrorResponse } from "../../../types/error-handling";
import { RawPrayerGroupDetails } from "../../../types/prayer-group-types";
import {
  PrayerRequestFilterCriteria,
  RawPrayerRequestGetResponse,
} from "../../../types/prayer-request-types";
import { PrayerRequestCardTestIds } from "../../prayer-request/tests/test-ids";
import { PrayerGroupHeaderTestIds } from "../header/tests/test-ids";
import { PrayerGroup } from "../prayer-group";
import { PrayerGroupContextProvider } from "../prayer-group-context";
import {
  mockPrayerGroupDetails1,
  mockPrayerRequests,
  mockPrayerGroupDetails,
  mockUserData,
} from "./mock-data";

let component: RenderResult;

const mockGetPrayerGroup = jest.fn();
const mockPostPrayerGroupUsers = jest.fn();
const mockDeletePrayerGroupUsers = jest.fn();
const mockPostPrayerRequestFilter = jest.fn();

jest.mock("@react-native-async-storage/async-storage", () => mockAsyncStorage);

jest.mock("@gorhom/bottom-sheet", () => ({
  __esModule: true,
  ...require("@gorhom/bottom-sheet/mock"),
}));

jest.mock("../../../api/get-prayer-group", () => ({
  useGetPrayerGroup: () => () => mockGetPrayerGroup(),
}));

jest.mock("../../../api/post-prayer-group-users", () => ({
  usePostPrayerGroupUsers:
    () => (id: number, usersToAdd: PrayerGroupUserToAdd[]) =>
      mockPostPrayerGroupUsers(id, usersToAdd),
}));

jest.mock("../../../api/delete-prayer-group-users", () => ({
  useDeletePrayerGroupUsers: () => (id: number, userIds: []) =>
    mockDeletePrayerGroupUsers(id, userIds),
}));

jest.mock("../../../hooks/use-api-data", () => ({
  ...jest.requireActual("../../../hooks/use-api-data"),
  useApiDataContext: () => ({ userData: mockUserData, setUserData: jest.fn() }),
}));

jest.mock("../../../api/post-prayer-request-filter", () => ({
  usePostPrayerRequestFilter:
    () => (userId: number, filterCriteria: PrayerRequestFilterCriteria) =>
      mockPostPrayerRequestFilter(userId, filterCriteria),
}));

const mountPrayerGroup = (
  rawPrayerGroupDetails: RawPrayerGroupDetails,
  useCustomPostPrayerRequestMock: boolean = false
) => {
  const mockGetResponse: ManagedErrorResponse<RawPrayerGroupDetails> = {
    isError: false,
    value: rawPrayerGroupDetails,
  };

  const mockPrayerRequestResponse: ManagedErrorResponse<RawPrayerRequestGetResponse> =
    {
      isError: false,
      value: {
        prayerRequests: [],
        totalCount: 0,
      },
    };

  if (!useCustomPostPrayerRequestMock) {
    mockPostPrayerRequestFilter.mockReturnValue(mockPrayerRequestResponse);
  }

  mockGetPrayerGroup.mockReturnValue(mockGetResponse);

  return mountComponent(
    <PrayerGroupContextProvider>
      <PrayerGroup prayerGroupId={2} />
    </PrayerGroupContextProvider>
  );
};

describe(PrayerGroup, () => {
  afterEach(() => {
    component?.unmount();
    jest.resetAllMocks();
  });

  test("Mount test", async () => {
    component = mountPrayerGroup(mockPrayerGroupDetails);
    await waitFor(() => {
      expect(component).toBeTruthy();
    });
  });

  test("Prayer group banner displays if not null", async () => {
    component = mountPrayerGroup(mockPrayerGroupDetails);
    const prayerGroupBanner = await component.findByTestId(
      PrayerGroupHeaderTestIds.imageBanner
    );
    expect(prayerGroupBanner).toHaveProp("source", {
      uri: mockPrayerGroupDetails.bannerFile?.fileUrl,
    });
  });

  test("Prayer group banner placeholder displays if banner is null", async () => {
    const rawPrayerGroupDetails: RawPrayerGroupDetails = {
      ...mockPrayerGroupDetails,
      bannerFile: undefined,
    };

    component = mountPrayerGroup(rawPrayerGroupDetails);
    const bannerPlaceholder = await component.findByTestId(
      PrayerGroupHeaderTestIds.bannerPlaceholder
    );
    expect(bannerPlaceholder).toBeTruthy();
  });

  test("Correct buttons display if user is a member", async () => {
    component = mountPrayerGroup(mockPrayerGroupDetails);
    const leaveGroupButton = await component.findByTestId(
      PrayerGroupHeaderTestIds.leaveGroupButton
    );
    const addPrayerRequestButton = await component.findByTestId(
      PrayerGroupHeaderTestIds.addPrayerRequestButton
    );

    expect(leaveGroupButton).toBeTruthy();
    expect(addPrayerRequestButton).toBeTruthy();
  });

  test("Join prayer group button displays if user is not a member", async () => {
    const rawPrayerGroupDetails: RawPrayerGroupDetails = {
      ...mockPrayerGroupDetails,
      prayerGroupRole: undefined,
      userJoinStatus: JoinStatus.NotJoined,
    };

    component = mountPrayerGroup(rawPrayerGroupDetails);

    const joinPrayerGroupButton = await component.findByTestId(
      PrayerGroupHeaderTestIds.joinGroupButton
    );
    const aboutGroupButton = await component.findByTestId(
      PrayerGroupHeaderTestIds.aboutGroupButton
    );

    expect(joinPrayerGroupButton).toBeTruthy();
    expect(aboutGroupButton).toBeTruthy();
  });

  test("Post prayer group users gets called when the user presses the join button", async () => {
    mockPostPrayerGroupUsers.mockReturnValue({ isError: false });

    const rawPrayerGroupDetails: RawPrayerGroupDetails = {
      ...mockPrayerGroupDetails,
      prayerGroupRole: undefined,
      userJoinStatus: JoinStatus.NotJoined,
    };

    component = mountPrayerGroup(rawPrayerGroupDetails);

    const joinPrayerGroupButton = await component.findByTestId(
      PrayerGroupHeaderTestIds.joinGroupButton
    );

    fireEvent.press(joinPrayerGroupButton);

    const prayerGroupUserToAdd = {
      id: 1,
      role: PrayerGroupRole.Member,
    };

    expect(mockPostPrayerGroupUsers).toHaveBeenCalledWith(2, [
      prayerGroupUserToAdd,
    ]);
  });

  test("Delete prayer group users gets called when user presses the leave button", async () => {
    mockDeletePrayerGroupUsers.mockReturnValue({ isError: false });
    component = mountPrayerGroup(mockPrayerGroupDetails);

    const leavePrayerGroupButton = await component.findByTestId(
      PrayerGroupHeaderTestIds.leaveGroupButton
    );

    fireEvent.press(leavePrayerGroupButton);

    await waitFor(() => {
      expect(mockDeletePrayerGroupUsers).toHaveBeenCalledWith(2, [1]);
    });
  });

  test("Prayer requests for prayer group show up on mount", async () => {
    const mockPrayerRequestFilterResponse: ManagedErrorResponse<RawPrayerRequestGetResponse> =
      {
        isError: false,
        value: {
          prayerRequests: mockPrayerRequests,
          totalCount: 3,
        },
      };

    let prayerRequestFilterCriteria: PrayerRequestFilterCriteria = {
      sortConfig: {
        sortField: "createdDate",
        sortDirection: SortOrder.Descending,
      },
    };

    mockPostPrayerRequestFilter.mockImplementation(
      (_userId: number, filterCriteria: PrayerRequestFilterCriteria) => {
        prayerRequestFilterCriteria = filterCriteria;
        return mockPrayerRequestFilterResponse;
      }
    );

    component = mountPrayerGroup(mockPrayerGroupDetails1, true);

    const prayerRequest = await component.findByTestId(
      `${PrayerRequestCardTestIds.requestTitle}-${9}`
    );

    expect(prayerRequest).toBeTruthy();
    expect(prayerRequestFilterCriteria?.pageIndex).toBe(0);
    expect(prayerRequestFilterCriteria?.prayerGroupIds).toStrictEqual([2]);
  });
});
