import "@testing-library/jest-native/extend-expect";
import "@testing-library/jest-native";

import { fireEvent, RenderResult } from "@testing-library/react-native";

import { PutPrayerGroupRequest } from "../../../../api/put-prayer-group";
import { mapPrayerGroupDetails } from "../../../../mappers/map-prayer-group";
import { mountComponent } from "../../../../tests/utils/test-utils";
import { ManagedErrorResponse } from "../../../../types/error-handling";
import { FileToUpload } from "../../../../types/media-file-types";
import {
  PrayerGroupDetails,
  RawPrayerGroupDetails,
} from "../../../../types/prayer-group-types";
import { mockRawPrayerGroupDetails, mockUserData } from "../../tests/mock-data";
import { UNIQUE_GROUP_NAME_ERROR } from "../edit-prayer-group-constants";
import { PrayerGroupEdit } from "../prayer-group-edit";
import { PrayerGroupEditTestIds } from "./test-ids";

let component: RenderResult;

const mockUsePrayerGroupContext = jest.fn();
const mockPostFile = jest.fn();
const mockDeleteFile = jest.fn();
const mockPutPrayerGroup = jest.fn();

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

jest.mock("../../../../api/post-file", () => ({
  usePostFile: () => (file: FileToUpload) => mockPostFile(file),
}));

jest.mock("../../../../api/delete-file", () => ({
  useDeleteFile: () => (fileId: number) => mockDeleteFile(fileId),
}));

jest.mock("../../../../api/put-prayer-group", () => ({
  usePutPrayerGroup:
    () => (prayerGroupId: number, request: PutPrayerGroupRequest) =>
      mockPutPrayerGroup(prayerGroupId, request),
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

  test("Group name must be unique", async () => {
    const putPrayerGroupResponse: ManagedErrorResponse<RawPrayerGroupDetails> =
      {
        isError: true,
        error: {
          dataValidationErrors: [UNIQUE_GROUP_NAME_ERROR],
        },
      };

    mockPutPrayerGroup.mockReturnValue(putPrayerGroupResponse);

    component = mountPrayerGroupEdit(
      mapPrayerGroupDetails(mockRawPrayerGroupDetails)
    );

    const newGroupName = "Order of the Phoenix";

    const groupNameTextInput = component.getByTestId(
      PrayerGroupEditTestIds.groupNameInput
    );
    fireEvent.changeText(groupNameTextInput, newGroupName);
    fireEvent(groupNameTextInput, "blur");

    const saveButton = await component.findByTestId(
      PrayerGroupEditTestIds.saveButton
    );
    fireEvent.press(saveButton);

    const groupNameContainer = await component.findByTestId(
      `${PrayerGroupEditTestIds.groupNameInput}-container`
    );
    expect(groupNameContainer).toHaveTextContent(
      "This group name has already been used."
    );
  });
});
