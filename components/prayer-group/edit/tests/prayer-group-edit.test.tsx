import "@testing-library/jest-native/extend-expect";
import "@testing-library/jest-native";

import { fireEvent, RenderResult } from "@testing-library/react-native";

import { mapPrayerGroupDetails } from "../../../../mappers/map-prayer-group";
import { mountComponent } from "../../../../tests/utils/test-utils";
import { PrayerGroupDetails } from "../../../../types/prayer-group-types";
import { mockRawPrayerGroupDetails, mockUserData } from "../../tests/mock-data";
import { PrayerGroupEdit } from "../prayer-group-edit";
import { PrayerGroupEditTestIds } from "./test-ids";

let component: RenderResult;

const mockUsePrayerGroupContext = jest.fn();

jest.mock("../../prayer-group-context", () => ({
  usePrayerGroupContext: () => mockUsePrayerGroupContext(),
}));

jest.mock("../../../../hooks/use-api-data", () => ({
  ...jest.requireActual("../../../../hooks/use-api-data"),
  useApiDataContext: () => ({ userData: mockUserData, setUserData: jest.fn() }),
}));

jest.mock("expo-router", () => ({
  usePathname: () => "/",
  router: {
    push: jest.fn(),
  },
}));

const mountPrayerGroupEdit = (prayerGroupDetails: PrayerGroupDetails) => {
  mockUsePrayerGroupContext.mockReturnValue({
    prayerGroupDetails,
    setPrayerGroupDetails: jest.fn(),
  });

  return mountComponent(<PrayerGroupEdit />);
};

describe(PrayerGroupEdit, () => {
  afterEach(() => {
    component?.unmount();
    jest.resetAllMocks();
  });

  test("Mount test", () => {
    component = mountPrayerGroupEdit(
      mapPrayerGroupDetails(mockRawPrayerGroupDetails)
    );

    expect(component).toBeTruthy();
  });

  test("Updating group name will update the group name in the preview", async () => {
    component = mountPrayerGroupEdit(
      mapPrayerGroupDetails(mockRawPrayerGroupDetails)
    );

    const newGroupName = "Ravenclaw";

    const groupNameTextInput = component.getByTestId(
      PrayerGroupEditTestIds.groupNameInput
    );
    fireEvent.changeText(groupNameTextInput, newGroupName);
    fireEvent(groupNameTextInput, "blur");

    const groupNamePreview = await component.findByTestId(
      PrayerGroupEditTestIds.groupPreviewName
    );
    expect(groupNamePreview).toHaveTextContent(newGroupName);
  });
});
