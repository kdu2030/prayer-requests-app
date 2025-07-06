import mockAsyncStorage from "@react-native-async-storage/async-storage/jest/async-storage-mock";
import {
  fireEvent,
  RenderResult,
  waitFor,
} from "@testing-library/react-native";

import { getArrayTestId } from "../../../helpers/utils";
import { mapPrayerRequests } from "../../../mappers/map-prayer-request";
import { mountComponent } from "../../../tests/utils/test-utils";
import { PrayerRequestModel } from "../../../types/prayer-request-types";
import {
  mockPrayerRequests,
  mockUserData,
} from "../../prayer-group/tests/mock-data";
import { PrayerRequestCard } from "../prayer-request-card";
import { PrayerRequestCardTestIds } from "./test-ids";

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
    jest.resetAllMocks();
  });

  test("Mount test", () => {
    const prayerRequests = mapPrayerRequests(mockPrayerRequests);

    component = mountPrayerRequestCard(prayerRequests[0], prayerRequests);
    expect(component).toBeTruthy();
  });

  test("Like button Adds prayer request like if user hasn't liked prayer request", async () => {
    let updatedPrayerRequests: PrayerRequestModel[] = [];

    mockSetPrayerRequests.mockImplementation(
      (prayerRequests: PrayerRequestModel[]) => {
        updatedPrayerRequests = prayerRequests;
      }
    );

    mockPostPrayerRequestLike.mockReturnValue({ isError: false });

    const prayerRequests = mapPrayerRequests(mockPrayerRequests);

    component = mountPrayerRequestCard(prayerRequests[0], prayerRequests);

    const likeButton = component.getByTestId(
      getArrayTestId(PrayerRequestCardTestIds.likeButton, 9)
    );
    fireEvent.press(likeButton);

    await waitFor(() => {
      expect(mockPostPrayerRequestLike).toHaveBeenCalledWith(1, 9);

      expect(updatedPrayerRequests[0].isUserLiked).toBeTruthy();
      expect(updatedPrayerRequests[0].likeCount).toBe(2);
    });
  });
});
