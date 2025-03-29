import "@testing-library/jest-native/extend-expect";
import "@testing-library/jest-native";

import mockAsyncStorage from "@react-native-async-storage/async-storage/jest/async-storage-mock";
import { RenderResult } from "@testing-library/react-native";
import { Formik } from "formik";
import * as React from "react";

import { mountComponent } from "../../../tests/utils/test-utils";
import { CreatePrayerGroupForm } from "../create-prayer-group-types";
import { GroupImageStep } from "../group-image-step/group-image-step";
import { GroupImageColorStepTestIds } from "./test-ids";

jest.mock("@react-native-async-storage/async-storage", () => mockAsyncStorage);

let component: RenderResult;

export const mountGroupImageColorStep = (
  initialValues: CreatePrayerGroupForm = {}
): RenderResult => {
  return mountComponent(
    <Formik initialValues={initialValues} onSubmit={() => {}}>
      <GroupImageStep setWizardStep={() => {}} />
    </Formik>
  );
};

describe(GroupImageStep, () => {
  afterEach(() => {
    component?.unmount();
  });

  test("Mount test", () => {
    component = mountGroupImageColorStep();
    expect(component).toBeTruthy();
  });

  test("Group name and description in preview matches user input", () => {
    const mockGroupName = "Alderaan Prayer Group";
    const mockDescription = "Prayer Group for the planet of Alderaan";

    component = mountGroupImageColorStep({
      groupName: mockGroupName,
      description: mockDescription,
    });

    const groupNamePreview = component.getByTestId(
      GroupImageColorStepTestIds.groupNamePreview
    );
    const descriptionPreview = component.getByTestId(
      GroupImageColorStepTestIds.descriptionPreview
    );

    expect(groupNamePreview).toHaveTextContent(mockGroupName);
    expect(descriptionPreview).toHaveTextContent(mockDescription);
  });
});
