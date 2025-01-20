import mockAsyncStorage from "@react-native-async-storage/async-storage/jest/async-storage-mock";
import { RenderResult } from "@testing-library/react-native";
import { Formik } from "formik";
import * as React from "react";

import { mountComponent } from "../../../tests/utils/test-utils";
import { CreatePrayerGroupForm } from "../create-prayer-group-types";
import { GroupNameDescriptionStep } from "../group-name-description-step";

let component: RenderResult;
const mockSetWizardStep = jest.fn();

jest.mock("@react-native-async-storage/async-storage", () => mockAsyncStorage);

const mountGroupNameDescriptionStep = (
  initialValues: CreatePrayerGroupForm = {}
): RenderResult => {
  return mountComponent(
    <Formik initialValues={initialValues} onSubmit={() => {}}>
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
});
