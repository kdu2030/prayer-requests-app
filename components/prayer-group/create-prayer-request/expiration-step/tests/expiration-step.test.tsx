import "@testing-library/jest-native/extend-expect";
import "@testing-library/jest-native";

import {
  renderHook,
  RenderResult,
  waitFor,
} from "@testing-library/react-native";
import { Formik } from "formik";
import * as React from "react";

import { englishTranslations } from "../../../../../i18n/en-us";
import { mountComponent } from "../../../../../tests/utils/test-utils";
import { TranslationKey } from "../../../../../types/languages";
import { mockUserData } from "../../../tests/mock-data";
import { CreatePrayerRequestForm } from "../../create-prayer-request-types";
import { ExpirationStep } from "../expiration-step";
import { useExpirationStepValidationSchema } from "../use-expiration-step-validation-schema";

let component: RenderResult;

const mockUsePrayerGroupContext = jest.fn();
const mockTranslate = jest.fn();

jest.mock("../../../../../hooks/use-api-data", () => ({
  useApiDataContext: () => ({
    userData: mockUserData,
  }),
}));

jest.mock("../../../prayer-group-context", () => ({
  usePrayerGroupContext: () => mockUsePrayerGroupContext(),
}));

const mountExpirationStep = (
  createPrayerRequestForm: CreatePrayerRequestForm
) => {
  mockTranslate.mockImplementation(
    (key: TranslationKey) => englishTranslations[key]
  );

  const { result: expirationStepValidationRef } = renderHook(() =>
    useExpirationStepValidationSchema()
  );

  return mountComponent(
    <Formik
      initialValues={createPrayerRequestForm}
      validationSchema={expirationStepValidationRef.current}
      onSubmit={() => {}}
    >
      <ExpirationStep setWizardStep={() => {}} />
    </Formik>
  );
};

describe(ExpirationStep, () => {
  afterEach(() => {
    component?.unmount();
    jest.resetAllMocks();
  });

  test("Mount test", async () => {
    component = mountExpirationStep({});

    await waitFor(() => {
      expect(component).toBeTruthy();
    });
  });
});
