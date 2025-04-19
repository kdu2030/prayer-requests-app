import {
  fireEvent,
  RenderResult,
  waitFor,
} from "@testing-library/react-native";
import * as React from "react";

import { ApiAuthResponse } from "../api/post-signup";
import { SignupTestIds } from "../components/authentication/auth-constants";
import Signup from "../components/authentication/sign-up";
import { ApiResponse } from "../types/api-response-types";
import { SignupForm } from "../types/forms/auth-forms";
import { CultureCode } from "../types/languages";
import { mockUserSummary } from "./mock-data/mock-tokens";
import { mountComponent } from "./utils/test-utils";

const mockPostSignup = jest.fn();
const mockRouterPush = jest.fn();

jest.mock("@react-native-async-storage/async-storage", () => ({
  ...jest.requireActual(
    "@react-native-async-storage/async-storage/jest/async-storage-mock"
  ),
}));

jest.mock("../api/post-signup", () => ({
  postSignup: () => mockPostSignup(),
}));

jest.mock("expo-router", () => ({
  router: {
    push: (path: string) => mockRouterPush(path),
  },
}));

let component: RenderResult;

const addInputToSignupForm = ({
  email,
  password,
  confirmPassword,
  username,
  fullName,
}: SignupForm) => {
  const usernameInput = component.getByTestId(SignupTestIds.usernameInput);
  fireEvent.changeText(usernameInput, username);

  const emailInput = component.getByTestId(SignupTestIds.emailInput);
  fireEvent.changeText(emailInput, email);

  const displayNameInput = component.getByTestId(
    SignupTestIds.displayNameInput
  );
  fireEvent.changeText(displayNameInput, fullName);

  const passwordInput = component.getByTestId(SignupTestIds.passwordInput);
  fireEvent.changeText(passwordInput, password);

  const confirmPasswordInput = component.getByTestId(
    SignupTestIds.confirmPasswordInput
  );
  fireEvent.changeText(confirmPasswordInput, confirmPassword);
};

describe("Signup Form Tests", () => {
  beforeEach(() => {
    component = mountComponent(<Signup />, CultureCode.enUS);
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

  test("Blank form prevents submit", async () => {
    const submitButton = component.getByTestId(SignupTestIds.submitButton);
    fireEvent.press(submitButton);

    await waitFor(() => {
      expect(mockPostSignup).not.toHaveBeenCalled();
    });
  });

  test("Valid Form is Submitted", async () => {
    const validSignupForm: SignupForm = {
      username: "testUsername",
      email: "test@test.com",
      password: "testPassword",
      fullName: "Test Name",
      confirmPassword: "testPassword",
    };

    const mockResponse: ApiResponse<ApiAuthResponse> = {
      isError: false,
      value: mockUserSummary,
    };

    mockPostSignup.mockReturnValueOnce(mockResponse);

    addInputToSignupForm(validSignupForm);

    const submitButton = component.getByTestId(SignupTestIds.submitButton);
    fireEvent.press(submitButton);

    await waitFor(() => {
      expect(mockPostSignup).toHaveBeenCalled();
    });
  });

  test("Invalid email prevents submission", async () => {
    const validSignupForm: SignupForm = {
      username: "testUsername",
      fullName: "Test Name",
      email: "test",
      password: "testPassword",
      confirmPassword: "testPassword",
    };

    addInputToSignupForm(validSignupForm);

    const submitButton = component.getByTestId(SignupTestIds.submitButton);
    fireEvent.press(submitButton);

    await waitFor(() => {
      expect(mockPostSignup).not.toHaveBeenCalled();
    });
  });

  test("Mismatched passwords prevents submission", async () => {
    const validSignupForm: SignupForm = {
      username: "testUsername",
      fullName: "Test Name",
      email: "test",
      password: "testPassword",
      confirmPassword: "testPassword2",
    };

    addInputToSignupForm(validSignupForm);

    const submitButton = component.getByTestId(SignupTestIds.submitButton);
    fireEvent.press(submitButton);

    await waitFor(() => {
      expect(mockPostSignup).not.toHaveBeenCalled();
    });
  });
});
