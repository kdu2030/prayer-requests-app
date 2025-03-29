import mockAsyncStorage from "@react-native-async-storage/async-storage/jest/async-storage-mock";
import { RenderResult } from "@testing-library/react-native";

import { mountComponent } from "../../../tests/utils/test-utils";
import { PrayerGroupDetails } from "../../../types/prayer-group-types";
import { PrayerGroupHeaderTestIds } from "../header/tests/test-ids";
import { PrayerGroup } from "../prayer-group";
import { mockPrayerGroupDetails } from "./mock-data";

let component: RenderResult;

const mockUsePrayerGroupContext = jest.fn();

jest.mock("@react-native-async-storage/async-storage", () => mockAsyncStorage);

jest.mock("../prayer-group-context", () => ({
  usePrayerGroupContext: () => mockUsePrayerGroupContext(),
}));

jest.mock("@gorhom/bottom-sheet", () => ({
  __esModule: true,
  ...require("@gorhom/bottom-sheet/mock"),
}));

const mountPrayerGroup = (prayerGroupDetails: PrayerGroupDetails) => {
  mockUsePrayerGroupContext.mockReturnValue({
    prayerGroupDetails,
    setPrayerGroupDetails: () => {},
  });

  return mountComponent(<PrayerGroup prayerGroupId={2} />);
};

describe(PrayerGroup, () => {
  afterEach(() => {
    component?.unmount();
    jest.resetAllMocks();
  });

  test("Mount test", () => {
    component = mountPrayerGroup(mockPrayerGroupDetails);
    expect(component).toBeTruthy();
  });

  test("Prayer group banner displays if not null", async () => {
    component = mountPrayerGroup(mockPrayerGroupDetails);
    const prayerGroupBanner = await component.findByTestId(
      PrayerGroupHeaderTestIds.imageBanner
    );
    expect(prayerGroupBanner).toHaveProp("source", {
      uri: mockPrayerGroupDetails.bannerImageFile?.url,
    });
  });
});
