import mockAsyncStorage from "@react-native-async-storage/async-storage/jest/async-storage-mock";
import {
  fireEvent,
  RenderResult,
  waitFor,
} from "@testing-library/react-native";

import { getArrayTestId } from "../../../helpers/utils";
import { mountComponent } from "../../../tests/utils/test-utils";
import { ManagedErrorResponse } from "../../../types/error-handling";
import {
  PrayerRequestActionCreateRequest,
  PrayerRequestLikeModel,
  PrayerRequestModel,
} from "../../../types/prayer-request-types";
import {
  mockPrayerRequests,
  mockUserData,
} from "../../prayer-group/tests/mock-data";
import { PrayerRequestListCard } from "../prayer-request-list-card";
import { PrayerRequestCardTestIds } from "./test-ids";

let component: RenderResult;

const mockSetPrayerRequests = jest.fn();
const mockPostPrayerRequestLike = jest.fn();
const mockDeletePrayerRequestLike = jest.fn();
const mockUsePrayerRequestDetailContext = jest.fn();

jest.mock("@react-native-async-storage/async-storage", () => mockAsyncStorage);

jest.mock("../../../hooks/use-api-data", () => ({
  ...jest.requireActual("../../../hooks/use-api-data"),
  useApiDataContext: () => ({ userData: mockUserData, setUserData: jest.fn() }),
}));

jest.mock("../../../api/post-prayer-request-like", () => ({
  usePostPrayerRequestLike:
    () =>
    (
      prayerRequestId: number,
      createRequest: PrayerRequestActionCreateRequest,
    ) =>
      mockPostPrayerRequestLike(prayerRequestId, createRequest),
}));

jest.mock("../../../api/delete-prayer-request-like", () => ({
  useDeletePrayerRequestLike: () => (prayerRequestLikeId: number) =>
    mockDeletePrayerRequestLike(prayerRequestLikeId),
}));

jest.mock("../prayer-request-detail-context", () => ({
  usePrayerRequestDetailContext: () => mockUsePrayerRequestDetailContext(),
}));

const mountPrayerRequestCard = (prayerRequest: PrayerRequestModel) => {
  mockUsePrayerRequestDetailContext.mockReturnValue({
    getPrayerRequestFromStore: () => {
      return prayerRequest;
    },
    setPrayerRequest: () => {},
  });

  return mountComponent(
    <PrayerRequestListCard
      prayerRequestId={prayerRequest.prayerRequestId!}
      onCommentPress={() => {}}
      showCreatedUser
      openPrayerRequestActions={() => {}}
    />,
  );
};

describe(PrayerRequestListCard, () => {
  afterEach(() => {
    component?.unmount();
    jest.resetAllMocks();
  });

  test("Mount test", () => {
    component = mountPrayerRequestCard(mockPrayerRequests[0]);
    expect(component).toBeTruthy();
  });

  test("Like button adds prayer request like if user hasn't liked prayer request", async () => {
    let updatedPrayerRequests: PrayerRequestModel[] = [];
    let submittedPrayerRequestId: number | undefined = undefined;

    mockSetPrayerRequests.mockImplementation(
      (prayerRequests: PrayerRequestModel[]) => {
        updatedPrayerRequests = prayerRequests;
      },
    );

    const mockPostLikeResponse: ManagedErrorResponse<PrayerRequestLikeModel> = {
      isError: false,
      value: {
        prayerRequestLikeId: 787,
        prayerRequestId: mockPrayerRequests[0].prayerRequestId,
        submittedUserId: 717,
        submittedDate: new Date().toISOString(),
      },
    };

    mockPostPrayerRequestLike.mockImplementation((prayerRequestId: number) => {
      submittedPrayerRequestId = prayerRequestId;
      return mockPostLikeResponse;
    });

    component = mountPrayerRequestCard(mockPrayerRequests[0]);

    const likeButton = component.getByTestId(
      getArrayTestId(PrayerRequestCardTestIds.likeButton, 9),
    );
    fireEvent.press(likeButton);

    await waitFor(() => {
      expect(submittedPrayerRequestId).toBe(
        mockPrayerRequests[0].prayerRequestId,
      );
      expect(updatedPrayerRequests[0].likeCount).toBe(2);
    });
  });

  test("Like button removes prayer request like if user liked prayer request", async () => {
    let updatedPrayerRequests: PrayerRequestModel[] = [];

    mockSetPrayerRequests.mockImplementation(
      (prayerRequests: PrayerRequestModel[]) => {
        updatedPrayerRequests = prayerRequests;
      },
    );

    mockDeletePrayerRequestLike.mockReturnValue({ isError: false });

    component = mountPrayerRequestCard(mockPrayerRequests[1]);

    const likeButton = component.getByTestId(
      getArrayTestId(PrayerRequestCardTestIds.likeButton, 8),
    );
    fireEvent.press(likeButton);

    await waitFor(() => {
      expect(mockDeletePrayerRequestLike).toHaveBeenCalledWith(787);
      expect(updatedPrayerRequests[1].likeCount).toBe(0);
    });
  });
});
