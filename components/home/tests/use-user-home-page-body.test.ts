import { renderHook, waitFor } from "@testing-library/react-native";

import { JoinStatus } from "../../../constants/prayer-group-constants";
import { UserData } from "../../../types/context/api-data-context-type";
import { ManagedErrorResponse } from "../../../types/error-handling";
import {
  PrayerRequestFilterCriteria,
  PrayerRequestGetResponse,
  PrayerRequestModel,
} from "../../../types/prayer-request-types";
import {
  mockPrayerRequests,
  mockUserData,
} from "../../prayer-group/tests/mock-data";
import { useUserHomePageBody } from "../use-user-home-page-body";

const mockAddPrayerRequestsToStore = jest.fn();
const mockGetPrayerRequestsFromStore = jest.fn();

const mockPostPrayerRequestFilter = jest.fn();
const mockPostPrayerRequestFilterCallback = (
  filterCriteria: PrayerRequestFilterCriteria,
) => {
  return mockPostPrayerRequestFilter(filterCriteria);
};

const mockGetUserData = jest.fn();

jest.mock("../../../hooks/use-api-data", () => ({
  useApiDataContext: () => ({
    userData: mockGetUserData(),
  }),
}));

jest.mock("../../prayer-request/global-prayer-requests-context", () => ({
  useGlobalPrayerRequestsContext: () => ({
    addPrayerRequestsToStore: mockAddPrayerRequestsToStore,
    getPrayerRequestsFromStore: mockGetPrayerRequestsFromStore,
  }),
}));

jest.mock("../../../api/post-prayer-request-filter", () => ({
  usePostPrayerRequestFilter: () => mockPostPrayerRequestFilterCallback,
}));

jest.mock("../../toasters/toaster-context", () => ({
  useToasterContext: () => ({
    openToaster: jest.fn(),
  }),
}));

jest.mock("../../../hooks/use-i18n", () => ({
  useI18N: () => ({
    translate: jest.fn(),
  }),
}));

describe(useUserHomePageBody, () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("Identifies joined prayer groups correctly", () => {
    const userDataWithJoinRequestGroups: UserData = {
      ...mockUserData,
      prayerGroups: [
        {
          prayerGroupId: 1,
          groupName: "Jedi Order",
          joinStatus: JoinStatus.Joined,
        },
        {
          prayerGroupId: 2,
          groupName: "Grand Army of the Republic",
          joinStatus: JoinStatus.Joined,
        },
        {
          prayerGroupId: 3,
          groupName: "Jedi Council",
          joinStatus: JoinStatus.RequestSubmitted,
        },
      ],
    };

    const prayerRequestGetResponse: ManagedErrorResponse<PrayerRequestGetResponse> =
      {
        isError: false,
        value: {
          prayerRequests: mockPrayerRequests,
          totalCount: mockPrayerRequests.length,
          pageIndex: 0,
          numberOfPages: 1,
        },
      };

    mockPostPrayerRequestFilter.mockReturnValue(prayerRequestGetResponse);

    mockGetUserData.mockReturnValue(userDataWithJoinRequestGroups);

    const useUserHomePageBodyRef = renderHook(() => useUserHomePageBody());
    const joinedPrayerGroupIds =
      useUserHomePageBodyRef.result.current.joinedPrayerGroups.map(
        (group) => group.prayerGroupId,
      );

    expect(joinedPrayerGroupIds).toStrictEqual([1, 2]);
  });

  test("Adds prayer requests to store correctly upon initialization", async () => {
    let prayerRequestsAdded: PrayerRequestModel[] = [];

    mockAddPrayerRequestsToStore.mockImplementation((prayerRequests) => {
      prayerRequestsAdded = prayerRequests;
    });

    mockGetUserData.mockReturnValue(mockUserData);

    const prayerRequestGetResponse: ManagedErrorResponse<PrayerRequestGetResponse> =
      {
        isError: false,
        value: {
          prayerRequests: mockPrayerRequests,
          totalCount: mockPrayerRequests.length,
          pageIndex: 0,
          numberOfPages: 1,
        },
      };

    mockPostPrayerRequestFilter.mockReturnValue(prayerRequestGetResponse);

    renderHook(() => useUserHomePageBody());

    await waitFor(() => {
      const prayerRequestIdsAdded = prayerRequestsAdded.map(
        (prayerRequest) => prayerRequest.prayerRequestId,
      );

      const expectedPrayerRequestIds = mockPrayerRequests.map(
        (prayerRequest) => prayerRequest.prayerRequestId,
      );

      expect(prayerRequestIdsAdded).toStrictEqual(expectedPrayerRequestIds);
    });
  });
});
