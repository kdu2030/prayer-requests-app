import "@testing-library/jest-native/extend-expect";
import "@testing-library/jest-native";

import mockAsyncStorage from "@react-native-async-storage/async-storage/jest/async-storage-mock";
import { RenderResult } from "@testing-library/react-native";

import { mountComponent } from "../../../tests/utils/test-utils";
import { ManagedErrorResponse } from "../../../types/error-handling";
import { RawPrayerGroupDetails } from "../../../types/prayer-group-types";
import { PrayerGroupHeaderTestIds } from "../header/tests/test-ids";
import { PrayerGroup } from "../prayer-group";
import { PrayerGroupContextProvider } from "../prayer-group-context";
import { mockRawPrayerGroupDetails } from "./mock-data";

let component: RenderResult;

const mockGetPrayerGroup = jest.fn();

jest.mock("@react-native-async-storage/async-storage", () => mockAsyncStorage);

jest.mock("@gorhom/bottom-sheet", () => ({
  __esModule: true,
  ...require("@gorhom/bottom-sheet/mock"),
}));

jest.mock("../../../api/get-prayer-group", () => ({
  useGetPrayerGroup: () => () => mockGetPrayerGroup(),
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

  test("Mount test", () => {
    component = mountPrayerGroup(mockRawPrayerGroupDetails);
    expect(component).toBeTruthy();
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

  test("Leave prayer group button displays if user is a member", async () => {
    component = mountPrayerGroup(mockRawPrayerGroupDetails);
    const bannerPlaceholder = await component.findByTestId(
      PrayerGroupHeaderTestIds.leaveGroupButton
    );
    expect(bannerPlaceholder).toBeTruthy();
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
    expect(joinPrayerGroupButton).toBeTruthy();
  });
});
