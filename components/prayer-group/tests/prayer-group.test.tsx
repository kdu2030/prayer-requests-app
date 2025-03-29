import "@testing-library/jest-native/extend-expect";
import "@testing-library/jest-native";

import mockAsyncStorage from "@react-native-async-storage/async-storage/jest/async-storage-mock";
import {
  fireEvent,
  RenderResult,
  waitFor,
} from "@testing-library/react-native";

import { PrayerGroupUserToAdd } from "../../../api/post-prayer-group-users";
import { PrayerGroupRole } from "../../../constants/prayer-group-constants";
import { mountComponent } from "../../../tests/utils/test-utils";
import { ManagedErrorResponse } from "../../../types/error-handling";
import { RawPrayerGroupDetails } from "../../../types/prayer-group-types";
import { PrayerGroupHeaderTestIds } from "../header/tests/test-ids";
import { PrayerGroup } from "../prayer-group";
import { PrayerGroupContextProvider } from "../prayer-group-context";
import { mockRawPrayerGroupDetails, mockUserData } from "./mock-data";

let component: RenderResult;

const mockGetPrayerGroup = jest.fn();
const mockPostPrayerGroupUsers = jest.fn();
const mockDeletePrayerGroupUsers = jest.fn();

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

const mountPrayerGroup = (rawPrayerGroupDetails: RawPrayerGroupDetails) => {
  const mockGetResponse: ManagedErrorResponse<RawPrayerGroupDetails> = {
    isError: false,
    value: rawPrayerGroupDetails,
  };

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
    component = mountPrayerGroup(mockRawPrayerGroupDetails);
    await waitFor(() => {
      expect(component).toBeTruthy();
    });
  });

  test("Prayer group banner displays if not null", async () => {
    component = mountPrayerGroup(mockRawPrayerGroupDetails);
    const prayerGroupBanner = await component.findByTestId(
      PrayerGroupHeaderTestIds.imageBanner
    );
    expect(prayerGroupBanner).toHaveProp("source", {
      uri: mockRawPrayerGroupDetails.bannerImageFile?.url,
    });
  });

  test("Prayer group banner placeholder displays if banner is null", async () => {
    const rawPrayerGroupDetails: RawPrayerGroupDetails = {
      ...mockRawPrayerGroupDetails,
      bannerImageFile: undefined,
    };

    component = mountPrayerGroup(rawPrayerGroupDetails);
    const bannerPlaceholder = await component.findByTestId(
      PrayerGroupHeaderTestIds.bannerPlaceholder
    );
    expect(bannerPlaceholder).toBeTruthy();
  });

  test("Correct buttons display if user is a member", async () => {
    component = mountPrayerGroup(mockRawPrayerGroupDetails);
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
      ...mockRawPrayerGroupDetails,
      userRole: undefined,
      isUserJoined: false,
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
      ...mockRawPrayerGroupDetails,
      userRole: undefined,
      isUserJoined: false,
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
    component = mountPrayerGroup(mockRawPrayerGroupDetails);

    const leavePrayerGroupButton = await component.findByTestId(
      PrayerGroupHeaderTestIds.leaveGroupButton
    );

    fireEvent.press(leavePrayerGroupButton);

    await waitFor(() => {
      expect(mockDeletePrayerGroupUsers).toHaveBeenCalledWith(2, [1]);
    });
  });
});
