import { render, RenderResult } from "@testing-library/react-native";
import mockSafeAreaContext from "react-native-safe-area-context/jest/mock";

import { getArrayTestId } from "../../../helpers/utils";
import { mountComponent } from "../../../tests/utils/test-utils";
import { PrayerRequestDetailsModel } from "../../../types/prayer-request-types";
import {
  mockPrayerRequests,
  mockUserData,
} from "../../prayer-group/tests/mock-data";
import { PrayerRequestCardTestIds } from "../../prayer-request/tests/test-ids";
import { PrayerRequestPage } from "../prayer-request-page";

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

let component: RenderResult;

describe(PrayerRequestPage, () => {
  afterEach(() => {
    component?.unmount();
    jest.resetAllMocks();
  });

  test("Mount test", () => {
    const mockPrayerRequest: PrayerRequestDetailsModel = {
      ...mockPrayerRequests[0],
    };

    mockGetPrayerRequest.mockReturnValue({
      isError: false,
      value: mockPrayerRequest,
    });

    component = mountComponent(
      <PrayerRequestPage prayerRequestId={9} scrollToCommentsOnLoad={false} />,
    );

    expect(component).toBeTruthy();
  });

  test("Prayer request renders", async () => {
    const mockPrayerRequest: PrayerRequestDetailsModel = {
      ...mockPrayerRequests[0],
    };

    mockGetPrayerRequest.mockReturnValue({
      isError: false,
      value: mockPrayerRequest,
    });

    component = mountComponent(
      <PrayerRequestPage prayerRequestId={9} scrollToCommentsOnLoad={false} />,
    );

    const prayerRequestDescription = await component.findByTestId(
      getArrayTestId(
        PrayerRequestCardTestIds.requestDescription,
        mockPrayerRequest.prayerRequestId,
      ),
    );

    expect(prayerRequestDescription).toBeTruthy();
  });
});
