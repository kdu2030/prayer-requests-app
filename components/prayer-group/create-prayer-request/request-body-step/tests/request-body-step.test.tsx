import "@testing-library/jest-native/extend-expect";
import "@testing-library/jest-native";

import {
  fireEvent,
  renderHook,
  RenderResult,
} from "@testing-library/react-native";
import { Formik } from "formik";
import * as React from "react";

import { englishTranslations } from "../../../../../i18n/en-us";
import { mountComponent } from "../../../../../tests/utils/test-utils";
import { TranslationKey } from "../../../../../types/languages";
import { CreatePrayerRequestForm } from "../../create-prayer-request-types";
import { RequestBodyStep } from "../request-body-step";
import { useRequestBodyValidationSchema } from "../use-request-body-validation-schema";
import { RequestBodyTestIds } from "./test-id";

let component: RenderResult;

const mockTranslate = jest.fn((translationKey: TranslationKey) => {
  return englishTranslations[translationKey];
});

jest.mock("../../../../../hooks/use-i18n", () => ({
  useI18N: () => ({
    i18n: {
      language: "en-US",
    },
    translate: (key: TranslationKey) => mockTranslate(key),
  }),
}));

const mountRequestBody = (formValues?: CreatePrayerRequestForm) => {
  const { result: requestBodyValidationSchemaRef } = renderHook(() =>
    useRequestBodyValidationSchema()
  );

  return mountComponent(
    <Formik
      initialValues={formValues ?? {}}
      validationSchema={requestBodyValidationSchemaRef.current}
      onSubmit={() => {}}
    >
      <RequestBodyStep setWizardStep={() => {}} />
    </Formik>
  );
};

describe(RequestBodyStep, () => {
  afterEach(() => {
    component?.unmount();
    jest.resetAllMocks();
  });

  test("Mount test", () => {
    component = mountRequestBody();
    expect(component).toBeTruthy();
  });

  test("Request title and description required error validates when user hits next", async () => {
    component = mountRequestBody();
    const nextButton = component.getByTestId(RequestBodyTestIds.nextButton);
    fireEvent.press(nextButton);

    const requestTitleContainer = await component.findByTestId(
      `${RequestBodyTestIds.requestTitleInput}-container`
    );
    const requestDescriptionContainer = await component.findByTestId(
      `${RequestBodyTestIds.requestDescriptionInput}-container`
    );

    expect(requestTitleContainer).toHaveTextContent(
      englishTranslations["form.validation.isRequired.error"]
    );
    expect(requestDescriptionContainer).toHaveTextContent(
      englishTranslations["form.validation.isRequired.error"]
    );
  });
});
