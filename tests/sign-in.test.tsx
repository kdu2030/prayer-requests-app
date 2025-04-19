import {
  fireEvent,
  RenderResult,
  waitFor,
} from "@testing-library/react-native";
import * as React from "react";

import { ApiAuthResponse } from "../api/post-signup";
import Signin from "../app/auth/sign-in";
import { SigninTestIds } from "../components/authentication/auth-constants";
import { ApiResponse } from "../types/api-response-types";
import { SigninForm } from "../types/forms/auth-forms";
import { CultureCode } from "../types/languages";
import { mockUserSummary } from "./mock-data/mock-tokens";
import { mountComponent } from "./utils/test-utils";

let component: RenderResult;

const mockPostSignin = jest.fn();
const mockRouterPush = jest.fn();

jest.mock("@react-native-async-storage/async-storage", () => ({
  ...jest.requireActual(
    "@react-native-async-storage/async-storage/jest/async-storage-mock"
  ),
}));

jest.mock("../api/post-signin", () => ({
  postSignin: () => mockPostSignin(),
}));

jest.mock("expo-router", () => ({
  router: {
    push: (path: string) => mockRouterPush(path),
  },
}));

const addInputToSignInForm = (
  { email, password }: SigninForm,
  clickSubmit: boolean = true
) => {
  const emailInput = component.getByTestId(SigninTestIds.emailInput);
  fireEvent.changeText(emailInput, email);

  const passwordInput = component.getByTestId(SigninTestIds.passwordInput);
  fireEvent.changeText(passwordInput, password);

  if (!clickSubmit) {
    return;
  }

  const submitButton = component.getByTestId(SigninTestIds.submitButton);
  fireEvent.press(submitButton);
};

describe("Sign In Tests", () => {
  beforeEach(() => {
    component = mountComponent(<Signin />, CultureCode.English);
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
      value: mockUserSummary,
    };

    mockPostSignin.mockReturnValueOnce(apiResponse);

    addInputToSignInForm(signinForm);

    await waitFor(() => {
      expect(mockPostSignin).toHaveBeenCalled();
    });
  });

  test("Email with invalid format not submitted", async () => {
    const signinForm: SigninForm = {
      email: "darthVader",
      password: "IL0veTheD@rkSide",
    };

    addInputToSignInForm(signinForm);

    await waitFor(() => {
      expect(mockPostSignin).not.toHaveBeenCalled();
    });
  });

  test("Missing password not submitted", async () => {
    const signinForm: SigninForm = {
      email: "darthVader@empire.gov",
      password: "",
    };

    addInputToSignInForm(signinForm);

    await waitFor(() => {
      expect(mockPostSignin).not.toHaveBeenCalled();
    });
  });
});
