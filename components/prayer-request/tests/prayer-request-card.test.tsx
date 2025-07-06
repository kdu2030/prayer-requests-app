import mockAsyncStorage from "@react-native-async-storage/async-storage/jest/async-storage-mock";
import { RenderResult } from "@testing-library/react-native";

import { mountComponent } from "../../../tests/utils/test-utils";
import { PrayerRequestModel } from "../../../types/prayer-request-types";
import {
  mockPrayerRequests,
  mockUserData,
} from "../../prayer-group/tests/mock-data";
import { PrayerRequestCard } from "../prayer-request-card";

let component: RenderResult;

const mockSetPrayerRequests = jest.fn();
const mockPostPrayerRequestLike = jest.fn();
const mockDeletePrayerRequestLike = jest.fn();

jest.mock("@react-native-async-storage/async-storage", () => mockAsyncStorage);

jest.mock("../../../hooks/use-api-data", () => ({
  ...jest.requireActual("../../../hooks/use-api-data"),
  useApiDataContext: () => ({ userData: mockUserData, setUserData: jest.fn() }),
}));

jest.mock("../../../api/post-prayer-request-like", () => ({
  usePostPrayerRequestLike: () => (userId: number, prayerRequestId: number) =>
    mockPostPrayerRequestLike(userId, prayerRequestId),
}));

jest.mock("../../../api/delete-prayer-request-like", () => ({
  useDeletePrayerRequestLike: () => (userId: number, prayerRequestId: number) =>
    mockDeletePrayerRequestLike(userId, prayerRequestId),
}));

const mountPrayerRequestCard = (
  prayerRequest: PrayerRequestModel,
  prayerRequests: PrayerRequestModel[]
) => {
  return mountComponent(
    <PrayerRequestCard
      prayerRequest={prayerRequest}
      prayerRequests={prayerRequests}
      setPrayerRequests={mockSetPrayerRequests}
      setSnackbarError={jest.fn()}
      showCreatedUser
    />
  );
};

describe(PrayerRequestCard, () => {
  afterEach(() => {
    component?.unmount();
  });

  test("Mount test", () => {
    component = mountPrayerRequestCard(
      mockPrayerRequests[0],
      mockPrayerRequests
    );
    expect(component).toBeTruthy();
  });
});
