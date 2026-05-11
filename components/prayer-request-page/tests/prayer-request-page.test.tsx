import { fireEvent, RenderResult } from "@testing-library/react-native";
import { cloneDeep } from "lodash";
import mockSafeAreaContext from "react-native-safe-area-context/jest/mock";

import { getArrayTestId } from "../../../helpers/utils";
import { mountComponent } from "../../../tests/utils/test-utils";
import {
  PrayerRequestCommentModel,
  PrayerRequestDetailsModel,
  PrayerRequestLikeModel,
  PrayerRequestModel,
} from "../../../types/prayer-request-types";
import {
  mockPrayerRequests,
  mockUserData,
} from "../../prayer-group/tests/mock-data";
import { PrayerRequestCardTestIds } from "../../prayer-request/tests/test-ids";
import { PrayerRequestPage } from "../prayer-request-page";
import { PrayerRequestPageTestIds } from "./test-ids";

const mockSetPrayerRequestGlobal = jest.fn();
const mockGetPrayerRequestFromStore = jest.fn();

const mockGetPrayerRequest = jest.fn();
const mockPostPrayerRequestLike = jest.fn();
const mockDeletePrayerRequestLike = jest.fn();

const mockPostPrayerRequestComment = jest.fn();
const mockPutPrayerRequestComment = jest.fn();
const mockDeletePrayerRequestComment = jest.fn();

jest.mock("../../toasters/toaster-context", () => ({
  useToasterContext: () => ({
    openToaster: jest.fn(),
  }),
}));

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

jest.mock("react-native-safe-area-context", () => mockSafeAreaContext);

jest.mock("@gorhom/bottom-sheet", () => ({
  __esModule: true,
  ...require("@gorhom/bottom-sheet/mock"),
}));

jest.mock("../../../hooks/use-api-data", () => ({
  ...jest.requireActual("../../../hooks/use-api-data"),
  useApiDataContext: () => ({
    userData: mockUserData,
  }),
}));

let component: RenderResult;

const mountPrayerRequestPage = (
  prayerRequest: PrayerRequestDetailsModel,
): RenderResult => {
  mockGetPrayerRequest.mockReturnValue({
    isError: false,
    value: prayerRequest,
  });

  return mountComponent(
    <PrayerRequestPage
      prayerRequestId={prayerRequest.prayerRequestId!}
      scrollToCommentsOnLoad={false}
    />,
  );
};

describe(PrayerRequestPage, () => {
  afterEach(() => {
    component?.unmount();
    jest.resetAllMocks();
  });

  test("Mount test", () => {
    const mockPrayerRequest: PrayerRequestDetailsModel = {
      ...mockPrayerRequests[0],
    };

    component = mountPrayerRequestPage(mockPrayerRequest);

    expect(component).toBeTruthy();
  });

  test("Prayer request renders", async () => {
    const mockPrayerRequest: PrayerRequestDetailsModel = {
      ...mockPrayerRequests[0],
    };

    component = mountPrayerRequestPage(mockPrayerRequest);

    const prayerRequestDescription = await component.findByTestId(
      getArrayTestId(
        PrayerRequestCardTestIds.requestDescription,
        mockPrayerRequest.prayerRequestId,
      ),
    );

    const prayerRequestTitle = await component.findByTestId(
      getArrayTestId(
        PrayerRequestCardTestIds.requestTitle,
        mockPrayerRequest.prayerRequestId,
      ),
    );

    expect(prayerRequestDescription).toHaveTextContent(
      mockPrayerRequest.requestDescription ?? "",
    );
    expect(prayerRequestTitle).toHaveTextContent(
      mockPrayerRequest.requestTitle ?? "",
    );
  });

  test("When the like button is clicked, the prayer request like count increments", async () => {
    const mockPrayerRequestLike: PrayerRequestLikeModel = {
      prayerRequestLikeId: 717,
      prayerRequestId: mockPrayerRequests[0].prayerRequestId,
      submittedUserId: mockUserData.userId,
      submittedDate: new Date().toISOString(),
    };

    mockPostPrayerRequestLike.mockReturnValue({
      isError: false,
      value: mockPrayerRequestLike,
    });

    const mockPrayerRequest: PrayerRequestDetailsModel = cloneDeep(
      mockPrayerRequests[0],
    );

    let calledPrayerRequestId: number | undefined = undefined;
    let updatedPrayerRequest: PrayerRequestModel = { ...mockPrayerRequest };

    mockSetPrayerRequestGlobal.mockImplementation(
      (prayerRequestId: number, prayerRequest: PrayerRequestModel) => {
        calledPrayerRequestId = prayerRequestId;
        updatedPrayerRequest = prayerRequest;
      },
    );

    const component = mountPrayerRequestPage(mockPrayerRequest);

    const likeButton = await component.findByTestId(
      getArrayTestId(
        PrayerRequestCardTestIds.likeButton,
        mockPrayerRequest.prayerRequestId,
      ),
    );

    fireEvent.press(likeButton);

    const likeButtonAfterIncrement = await component.findByTestId(
      getArrayTestId(
        PrayerRequestCardTestIds.likeButton,
        mockPrayerRequestLike.prayerRequestId,
      ),
    );

    expect(likeButtonAfterIncrement).toHaveTextContent("2");

    expect(calledPrayerRequestId).toBe(mockPrayerRequest.prayerRequestId);
    expect(updatedPrayerRequest.userLikeId).toBe(
      mockPrayerRequestLike.prayerRequestLikeId,
    );
  });

  test("When the like button is clicked and the user already liked the request, the prayer request like count decrements ", async () => {
    mockDeletePrayerRequestLike.mockReturnValue({
      isError: false,
    });

    const mockPrayerRequest: PrayerRequestDetailsModel = {
      ...cloneDeep(mockPrayerRequests[0]),
      userLikeId: 717,
    };

    let calledPrayerRequestId: number | undefined = undefined;
    let updatedPrayerRequest: PrayerRequestModel = { ...mockPrayerRequest };

    mockSetPrayerRequestGlobal.mockImplementation(
      (prayerRequestId: number, prayerRequest: PrayerRequestModel) => {
        calledPrayerRequestId = prayerRequestId;
        updatedPrayerRequest = prayerRequest;
      },
    );

    const component = mountPrayerRequestPage(mockPrayerRequest);

    const likeButton = await component.findByTestId(
      getArrayTestId(
        PrayerRequestCardTestIds.likeButton,
        mockPrayerRequest.prayerRequestId,
      ),
    );

    fireEvent.press(likeButton);

    const likeButtonAfterDecrement = await component.findByTestId(
      getArrayTestId(
        PrayerRequestCardTestIds.likeButton,
        mockPrayerRequest.prayerRequestId,
      ),
    );

    expect(likeButtonAfterDecrement).toHaveTextContent("0");

    expect(calledPrayerRequestId).toBe(mockPrayerRequest.prayerRequestId);
    expect(updatedPrayerRequest.userLikeId).toBeFalsy();
  });

  test("If the user doesn't add a comment, the post comment button is disabled", async () => {
    const mockPrayerRequest: PrayerRequestDetailsModel = {
      ...mockPrayerRequests[0],
    };
    const component = mountPrayerRequestPage(mockPrayerRequest);

    const prayerRequestPostButton = await component.findByTestId(
      PrayerRequestPageTestIds.postCommentButton,
    );

    expect(prayerRequestPostButton).toBeDisabled();
  });

  test("When a user adds a comment, the comment is posted", async () => {
    const mockCommentText =
      "A Jedi uses the Force for knowledge and defense, never attack.";

    const mockPrayerRequestComment: PrayerRequestCommentModel = {
      prayerRequestCommentId: 727,
      user: mockUserData,
      comment: mockCommentText,
      submittedDate: new Date().toISOString(),
    };

    mockPostPrayerRequestComment.mockReturnValue({
      isError: false,
      value: mockPrayerRequestComment,
    });

    const mockPrayerRequest: PrayerRequestDetailsModel = cloneDeep(
      mockPrayerRequests[0],
    );

    const component = mountPrayerRequestPage(mockPrayerRequest);

    const prayerRequestField = await component.findByTestId(
      PrayerRequestPageTestIds.commentField,
    );

    fireEvent.changeText(prayerRequestField, mockCommentText);

    const prayerRequestPostButton = await component.findByTestId(
      PrayerRequestPageTestIds.postCommentButton,
    );

    fireEvent.press(prayerRequestPostButton);

    const postedComment = await component.findByTestId(
      getArrayTestId(
        PrayerRequestPageTestIds.commentText,
        mockPrayerRequestComment.prayerRequestCommentId,
      ),
    );

    expect(postedComment).toHaveTextContent(mockCommentText);
  });

  test("If the comment belongs to the current user, the comment actions button is shown", async () => {
    const mockPrayerRequestComment: PrayerRequestCommentModel = {
      prayerRequestCommentId: 737,
      user: mockUserData,
      comment:
        "You're always saying there's something wrong with society, maybe there's something wrong with you?",
      submittedDate: new Date().toISOString(),
    };

    const mockPrayerRequest: PrayerRequestDetailsModel = {
      ...cloneDeep(mockPrayerRequests[0]),
      comments: [mockPrayerRequestComment],
      userCommentIds: [mockPrayerRequestComment.prayerRequestCommentId ?? -1],
      commentCount: 1,
    };

    const component = mountPrayerRequestPage(mockPrayerRequest);

    const commentActionsButton = await component.findByTestId(
      getArrayTestId(
        PrayerRequestPageTestIds.commentActionsButton,
        mockPrayerRequestComment.prayerRequestCommentId,
      ),
    );

    expect(commentActionsButton).toBeTruthy();
  });
});
