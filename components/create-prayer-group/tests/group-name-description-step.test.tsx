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
import { CreatePrayerGroupForm } from "../create-prayer-group-types";
import { GroupNameDescriptionStep } from "../group-name-description-step";
import { groupNameValidationSchema } from "../group-name-validation-schema";
import { CreatePrayerGroupWizardHeaderTestIds } from "./test-ids";

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
      validationSchema={groupNameValidationSchema(mockTranslate)}
      onSubmit={() => {}}
    >
      <GroupNameDescriptionStep setWizardStep={mockSetWizardStep} />
    </Formik>
  );
};

describe(GroupNameDescriptionStep, () => {
  afterEach(() => {
    component?.unmount();
    jest.resetAllMocks();
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
});
