import { PrayerRequestFilterCriteria } from "../../../types/prayer-request-types";
import { mockUserData } from "../../prayer-group/tests/mock-data";
import { useUserHomePageBody } from "../use-user-home-page-body";

const mockAddPrayerRequestsToStore = jest.fn();
const mockGetPrayerRequestsFromStore = jest.fn();

const mockPostPrayerRequestFilter = jest.fn();
const mockUsePostPrayerRequestFilter =
  () => (filterCriteria: PrayerRequestFilterCriteria) => {
    mockPostPrayerRequestFilter(filterCriteria);
  };

jest.mock("../../../hooks/use-api-data", () => ({
  userData: mockUserData,
}));

jest.mock("../../prayer-request/global-prayer-requests-context", () => ({
  useGlobalPrayerRequestsContext: () => ({
    addPrayerRequestsToStore: mockAddPrayerRequestsToStore,
    getPrayerRequestsFromStore: mockGetPrayerRequestsFromStore,
  }),
}));

jest.mock("../../../api/post-prayer-request-filter", () => ({
  usePostPrayerRequestFilter: mockUsePostPrayerRequestFilter,
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
});
