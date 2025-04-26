import "@testing-library/jest-native/extend-expect";
import "@testing-library/jest-native";

import {
  fireEvent,
  renderHook,
  RenderResult,
} from "@testing-library/react-native";
import { Formik } from "formik";
import * as React from "react";

import { TEXT_INPUT_MAX_LENGTH } from "../../../../../constants/input-constants";
import { mountComponent } from "../../../../../tests/utils/test-utils";
import { CreatePrayerRequestForm } from "../../create-prayer-request-types";
import { RequestBodyStep } from "../request-body-step";
import { useRequestBodyValidationSchema } from "../use-request-body-validation-schema";
import { RequestBodyTestIds } from "./test-id";

let component: RenderResult;

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

    expect(requestTitleContainer).toHaveTextContent("required");
    expect(requestDescriptionContainer).toHaveTextContent("required");
  });

  test("Max length error shows for request title", async () => {
    component = mountRequestBody();

    let mockRequestTitle = "";
    for (let i = 0; i < TEXT_INPUT_MAX_LENGTH + 1; i++) {
      mockRequestTitle += "a";
    }

    const requestTitleInput = component.getByTestId(
      RequestBodyTestIds.requestTitleInput
    );
    fireEvent.changeText(requestTitleInput, mockRequestTitle);
    fireEvent(requestTitleInput, "blur");

    const requestTitleContainer = await component.findByTestId(
      `${RequestBodyTestIds.requestTitleInput}-container`
    );
    expect(requestTitleContainer).toHaveTextContent(
      "must be less than 255 characters"
    );
  });
});
