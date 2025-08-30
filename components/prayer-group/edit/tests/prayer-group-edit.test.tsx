import "@testing-library/jest-native/extend-expect";
import "@testing-library/jest-native";

import mockAsyncStorage from "@react-native-async-storage/async-storage/jest/async-storage-mock";
import {
  fireEvent,
  RenderResult,
  waitFor,
} from "@testing-library/react-native";

import { PutPrayerGroupRequest } from "../../../../api/put-prayer-group";
import { mapPrayerGroupDetails } from "../../../../mappers/map-prayer-group";
import { mountComponent } from "../../../../tests/utils/test-utils";
import { UserData } from "../../../../types/context/api-data-context-type";
import { ManagedErrorResponse } from "../../../../types/error-handling";
import { FileToUpload, RawMediaFile } from "../../../../types/media-file-types";
import {
  PrayerGroupDetails,
  RawPrayerGroupDetails,
} from "../../../../types/prayer-group-types";
import {
  mockMediaFile,
  mockRawPrayerGroupDetails,
  mockUserData,
} from "../../tests/mock-data";
import { UNIQUE_GROUP_NAME_ERROR } from "../edit-prayer-group-constants";
import { PrayerGroupEdit } from "../prayer-group-edit";
import { PrayerGroupEditTestIds } from "./test-ids";

let component: RenderResult;

const mockUsePrayerGroupContext = jest.fn();
const mockSetUserData = jest.fn();

const mockPostFile = jest.fn();
const mockDeleteFile = jest.fn();
const mockPutPrayerGroup = jest.fn();

jest.mock("@react-native-async-storage/async-storage", () => mockAsyncStorage);

jest.mock("../../prayer-group-context", () => ({
  usePrayerGroupContext: () => mockUsePrayerGroupContext(),
}));

jest.mock("../../../../hooks/use-api-data", () => ({
  ...jest.requireActual("../../../../hooks/use-api-data"),
  useApiDataContext: () => ({
    userData: mockUserData,
    setUserData: mockSetUserData,
  }),
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

  test("Post file gets called if banner image is not uploaded", async () => {
    const rawPrayerGroupDetails: RawPrayerGroupDetails = {
      ...mockRawPrayerGroupDetails,
      bannerFile: {
        ...mockRawPrayerGroupDetails.bannerFile,
        mediaFileId: undefined,
      },
    };

    component = mountPrayerGroupEdit(
      mapPrayerGroupDetails(rawPrayerGroupDetails)
    );

    const saveButton = await component.findByTestId(
      PrayerGroupEditTestIds.saveButton
    );
    fireEvent.press(saveButton);

    const mockPostFileResponse: ManagedErrorResponse<RawMediaFile> = {
      isError: false,
      value: mockRawPrayerGroupDetails.bannerFile!,
    };

    const mockPutPrayerGroupResponse: ManagedErrorResponse<RawPrayerGroupDetails> =
      {
        isError: false,
        value: mockRawPrayerGroupDetails,
      };

    mockPostFile.mockReturnValue(mockPostFileResponse);
    mockPutPrayerGroup.mockReturnValue(mockPutPrayerGroupResponse);

    await waitFor(() => {
      expect(mockPostFile).toHaveBeenCalled();
    });
  });

  test("Avatar image in user data gets updated in user data upon save", async () => {
    const rawPrayerGroupDetails: RawPrayerGroupDetails = {
      ...mockRawPrayerGroupDetails,
      avatarFile: {
        ...mockRawPrayerGroupDetails.avatarFile,
        mediaFileId: undefined,
      },
    };

    component = mountPrayerGroupEdit(
      mapPrayerGroupDetails(rawPrayerGroupDetails)
    );

    const saveButton = await component.findByTestId(
      PrayerGroupEditTestIds.saveButton
    );
    fireEvent.press(saveButton);

    const mockPostFileResponse: ManagedErrorResponse<RawMediaFile> = {
      isError: false,
      value: mockRawPrayerGroupDetails.avatarFile!,
    };

    const mockPutPrayerGroupResponse: ManagedErrorResponse<RawPrayerGroupDetails> =
      {
        isError: false,
        value: {
          ...mockRawPrayerGroupDetails,
          avatarFile: { ...mockMediaFile, mediaFileId: 4 },
        },
      };

    mockPostFile.mockReturnValue(mockPostFileResponse);
    mockPutPrayerGroup.mockReturnValue(mockPutPrayerGroupResponse);

    await waitFor(() => {
      const updatedUserData: UserData = {
        ...mockUserData,
        prayerGroups: [
          mockUserData.prayerGroups![0],
          {
            prayerGroupId: 2,
            avatarFile: { ...mockMediaFile, id: 4 },
            groupName: "Prayer Group 2",
          },
        ],
      };

      expect(mockSetUserData).toHaveBeenCalledWith(updatedUserData);
    });
  });
});
