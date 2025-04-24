import { renderHook, RenderResult } from "@testing-library/react-native";
import { Formik } from "formik";
import * as React from "react";

import { mountComponent } from "../../../../../tests/utils/test-utils";
import { TranslationKey } from "../../../../../types/languages";
import { CreatePrayerRequestForm } from "../../create-prayer-request-types";
import { RequestBodyStep } from "../request-body-step";
import { useRequestBodyValidationSchema } from "../use-request-body-validation-schema";

let component: RenderResult;

const mockTranslate = jest.fn();

jest.mock("../../../../../hooks/use-i18n", () => ({
  useI18N: () => ({
    i18n: {
      language: "en-US",
    },
    translate: (key: TranslationKey, args: object) => mockTranslate(key, args),
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
});
