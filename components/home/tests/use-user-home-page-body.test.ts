import { renderHook } from "@testing-library/react-native";

import { JoinStatus } from "../../../constants/prayer-group-constants";
import { UserData } from "../../../types/context/api-data-context-type";
import { PrayerRequestFilterCriteria } from "../../../types/prayer-request-types";
import { mockUserData } from "../../prayer-group/tests/mock-data";
import { useUserHomePageBody } from "../use-user-home-page-body";

const mockAddPrayerRequestsToStore = jest.fn();
const mockGetPrayerRequestsFromStore = jest.fn();

const mockPostPrayerRequestFilter = jest.fn();
const mockPostPrayerRequestFilterCallback = (
  filterCriteria: PrayerRequestFilterCriteria,
) => {
  mockPostPrayerRequestFilter(filterCriteria);
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

  test("Counts joined prayer groups correctly", () => {
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

    mockGetUserData.mockReturnValue(userDataWithJoinRequestGroups);

    const useUserHomePageBodyRef = renderHook(() => useUserHomePageBody());
    const joinedPrayerGroupIds =
      useUserHomePageBodyRef.result.current.joinedPrayerGroups.map(
        (group) => group.prayerGroupId,
      );

    expect(joinedPrayerGroupIds).toContain([1, 2]);
  });
});
