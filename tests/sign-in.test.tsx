import Signin from "../app/auth/sign-in";
import {
  RenderResult,
  fireEvent,
  waitFor,
} from "@testing-library/react-native";
import * as React from "react";
import { mountComponent } from "./utils/test-utils";
import { SupportedLanguages } from "../types/languages";
import { SigninTestIds } from "../constants/auth/auth-constants";
import { SigninForm } from "../types/forms/auth-forms";
import { ApiResponse } from "../types/api-response-types";
import { ApiAuthResponse } from "../api/post-signup";
import { userTokenPair } from "./mock-data/mock-tokens";
import { postSignin } from "../api/post-signin";

let component: RenderResult;

const mockPostSignin = jest.fn();

jest.mock("@react-native-async-storage/async-storage", () => ({
  ...jest.requireActual(
    "@react-native-async-storage/async-storage/jest/async-storage-mock"
  ),
}));

jest.mock("../api/post-signin", () => ({
  postSignin: () => mockPostSignin(),
}));

const addInputToSignInForm = (
  { email, password }: SigninForm,
  clickSubmit: boolean = true
) => {
  const emailInput = component.getByTestId(SigninTestIds.emailInput);
  fireEvent.changeText(emailInput, email);

  const passwordInput = component.getByTestId(SigninTestIds.passwordInput);
  fireEvent.changeText(passwordInput, password);

  const submitButton = component.getByTestId(SigninTestIds.submitButton);
  fireEvent.press(submitButton);
};

describe("Sign In Tests", () => {
  beforeEach(() => {
    component = mountComponent(<Signin />, SupportedLanguages.English);
  });

  afterEach(() => {
    if (component) {
      component.unmount();
    }

    jest.resetAllMocks();
  });

  test("Component mounts", () => {
    expect(component).not.toBeNull();
  });

  test("Empty form prevents submission", async () => {
    const submitButton = component.getByTestId(SigninTestIds.submitButton);
    fireEvent.press(submitButton);

    await waitFor(() => {
      expect(mockPostSignin).not.toHaveBeenCalled();
    });
  });

  test("Valid form submitted", async () => {
    const signinForm: SigninForm = {
      email: "darthvader@empire.com",
      password: "IL0veTheD@rkSide",
    };

    const apiResponse: ApiResponse<ApiAuthResponse> = {
      isError: false,
      value: userTokenPair,
    };

    mockPostSignin.mockReturnValueOnce(apiResponse);

    addInputToSignInForm(signinForm);

    await waitFor(() => {
      expect(mockPostSignin).toHaveBeenCalled();
    });
  });
});
