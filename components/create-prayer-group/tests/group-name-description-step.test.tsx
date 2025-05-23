import "@testing-library/jest-native/extend-expect";
import "@testing-library/jest-native";

import mockAsyncStorage from "@react-native-async-storage/async-storage/jest/async-storage-mock";
import {
  fireEvent,
  RenderResult,
  waitFor,
} from "@testing-library/react-native";
import { Formik } from "formik";
import * as React from "react";

import { GetPrayerGroupNameValidationResponse } from "../../../api/get-prayer-group-name-validation";
import { mountComponent } from "../../../tests/utils/test-utils";
import { ManagedErrorResponse } from "../../../types/error-handling";
import { CultureCode, TranslationKey } from "../../../types/languages";
import { PRAYER_GROUP_NAME_EXISTS } from "../create-prayer-group-constants";
import { CreatePrayerGroupForm } from "../create-prayer-group-types";
import { GroupNameDescriptionStep } from "../group-name-description-step";
import { groupNameValidationSchema } from "../group-name-validation-schema";
import {
  CreatePrayerGroupWizardHeaderTestIds,
  GroupNameDescriptionStepTestIds,
} from "./test-ids";

let component: RenderResult;

const mockSetWizardStep = jest.fn();
const mockTranslate = jest.fn();
const mockGetPrayerGroupNameValidation = jest.fn();

jest.mock("@react-native-async-storage/async-storage", () => mockAsyncStorage);
jest.mock("../../../api/get-prayer-group-name-validation", () => ({
  useGetPrayerGroupNameValidation: () => mockGetPrayerGroupNameValidation,
}));

const mountGroupNameDescriptionStep = (
  initialValues: CreatePrayerGroupForm = {}
): RenderResult => {
  return mountComponent(
    <Formik
      initialValues={initialValues}
      validationSchema={groupNameValidationSchema(
        mockTranslate,
        CultureCode.enUS
      )}
      onSubmit={() => {}}
    >
      <GroupNameDescriptionStep setWizardStep={mockSetWizardStep} />
    </Formik>
  );
};

describe(GroupNameDescriptionStep, () => {
  afterEach(() => {
    component?.unmount();
    jest.clearAllMocks();
  });

  test("Mount test", () => {
    component = mountGroupNameDescriptionStep();
    expect(component).toBeTruthy();
  });

  test("Set wizard step is called when the user clicks next and step is valid", async () => {
    const mockResponse: ManagedErrorResponse<GetPrayerGroupNameValidationResponse> =
      {
        isError: false,
        value: {
          isNameValid: true,
          errors: [],
        },
      };

    mockGetPrayerGroupNameValidation.mockReturnValue(mockResponse);

    component = mountGroupNameDescriptionStep({
      groupName: "Spruce Avenue Presbyterian Church Prayer Group",
      description: "Prayer Group for church in Niagra Falls in the Office",
    });

    const nextButton = component.getByTestId(
      CreatePrayerGroupWizardHeaderTestIds.nextButton
    );
    fireEvent.press(nextButton);

    await waitFor(() => {
      expect(mockSetWizardStep).toHaveBeenCalled();
    });
  });

  test("Group name and description are required", async () => {
    mockTranslate.mockImplementation(
      (key: TranslationKey, translationParams: any) => {
        switch (key) {
          case "form.validation.isRequired.error":
            return `${translationParams.field} is required.`;
          case "createPrayerGroup.groupNameDescription.groupName":
            return "Group Name";
          case "createPrayerGroup.groupNameDescription.description":
            return "Description";
        }
      }
    );

    component = mountGroupNameDescriptionStep();

    const nextButton = component.getByTestId(
      CreatePrayerGroupWizardHeaderTestIds.nextButton
    );
    fireEvent.press(nextButton);

    const groupNameInputContainer = await component.findByTestId(
      `${GroupNameDescriptionStepTestIds.groupNameInput}-container`
    );
    const descriptionInputContainer = await component.findByTestId(
      `${GroupNameDescriptionStepTestIds.descriptionInput}-container`
    );

    expect(groupNameInputContainer).toHaveTextContent(
      "Group Name is required."
    );
    expect(descriptionInputContainer).toHaveTextContent(
      "Description is required"
    );
  });

  test("If there is an existing prayer group with the same group name, an error shows", async () => {
    mockTranslate.mockImplementation(
      (key: TranslationKey, translationParams: any) => {
        switch (key) {
          case "form.validation.unique.error":
            return `This ${translationParams.field} has already been used.`;
          case "createPrayerGroup.groupNameDescription.groupName":
            return "Group Name";
        }
      }
    );

    const mockResponse: ManagedErrorResponse<GetPrayerGroupNameValidationResponse> =
      {
        isError: false,
        value: {
          isNameValid: false,
          errors: [PRAYER_GROUP_NAME_EXISTS],
        },
      };

    mockGetPrayerGroupNameValidation.mockReturnValue(mockResponse);

    component = mountGroupNameDescriptionStep({
      groupName: "GCBCR Youth Group",
      description:
        "This is a group for middle school and high school students of GCBCR.",
    });

    const nextButton = component.getByTestId(
      CreatePrayerGroupWizardHeaderTestIds.nextButton
    );
    fireEvent.press(nextButton);

    const groupNameInput = await component.findByTestId(
      `${GroupNameDescriptionStepTestIds.groupNameInput}-container`
    );

    expect(groupNameInput).toHaveTextContent(
      "This Group Name has already been used."
    );
  });
});
