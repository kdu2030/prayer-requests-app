import { englishTranslations } from "../../../i18n/en-us";
import { mockUserData } from "../../prayer-group/tests/mock-data";
import { PrayerRequestPage } from "../prayer-request-page";

const mockSetPrayerRequestGlobal = jest.fn();
const mockGetPrayerRequestFromStore = jest.fn();

const mockGetPrayerRequest = jest.fn();
const mockPostPrayerRequestLike = jest.fn();
const mockDeletePrayerRequestLike = jest.fn();

const mockPostPrayerRequestComment = jest.fn();
const mockPutPrayerRequestComment = jest.fn();
const mockDeletePrayerRequestComment = jest.fn();

jest.mock("../../../hooks/use-api-data", () => ({
  useApiDataContext: () => {
    return {
      userData: mockUserData,
    };
  },
}));

jest.mock("../../../hooks/use-i18n", () => ({
  useI18N: () => {
    return {
      translate: (key: keyof typeof englishTranslations) => {
        return englishTranslations[key];
      },
    };
  },
}));

jest.mock("../../toasters/toaster-context");

jest.mock("../../prayer-request/prayer-request-detail-context", () => ({
  usePrayerRequestDetailContext: () => ({
    setPrayerRequest: mockSetPrayerRequestGlobal,
    getPrayerRequestFromStore: mockGetPrayerRequestFromStore,
  }),
}));

jest.mock("../../../api/get-prayer-request", () => ({
  useGetPrayerRequest: () => mockGetPrayerRequest,
}));

jest.mock("../../../api/post-prayer-request-like", () => ({
  usePostPrayerRequestLike: () => mockPostPrayerRequestLike,
}));

jest.mock("../../../api/delete-prayer-request-like", () => ({
  useDeletePrayerRequestLike: () => mockDeletePrayerRequestLike,
}));

jest.mock("../../../api/post-prayer-request-comment", () => ({
  usePostPrayerRequestComment: () => mockPostPrayerRequestComment,
}));

jest.mock("../../../api/put-prayer-request-comment", () => ({
  usePutPrayerRequestComment: () => mockPutPrayerRequestComment,
}));

jest.mock("../../../api/delete-prayer-request-comment", () => ({
  useDeletePrayerRequestComment: () => mockDeletePrayerRequestComment,
}));

describe(PrayerRequestPage, () => {});
