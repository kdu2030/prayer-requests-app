import {
  fireEvent,
  RenderResult,
  waitFor,
} from "@testing-library/react-native";
import * as React from "react";

import { ApiSignupResponse } from "../api/post-signup";
import Signup from "../app/auth/sign-up";
import { SignupTestIds } from "../constants/auth/auth-constants";
import { ApiResponse } from "../types/api-response-types";
import { SignupForm } from "../types/forms/authentication-forms";
import { SupportedLanguages } from "../types/languages";
import { userTokenPair } from "./mock-data/mock-tokens";
import { mountComponent } from "./utils/test-utils";

const mockPostSignup = jest.fn();

jest.mock("@react-native-async-storage/async-storage", () => ({
  ...jest.requireActual(
    "@react-native-async-storage/async-storage/jest/async-storage-mock"
  ),
}));

jest.mock("../api/post-signup", () => ({
  postSignup: () => mockPostSignup(),
}));

let component: RenderResult;

const addInputToSignupForm = ({
  email,
  password,
  confirmPassword,
  username,
}: SignupForm) => {
  const usernameInput = component.getByTestId(SignupTestIds.usernameInput);
  fireEvent.changeText(usernameInput, username);

  const emailInput = component.getByTestId(SignupTestIds.emailInput);
  fireEvent.changeText(emailInput, email);

  const passwordInput = component.getByTestId(SignupTestIds.passwordInput);
  fireEvent.changeText(passwordInput, password);

  const confirmPasswordInput = component.getByTestId(
    SignupTestIds.confirmPasswordInput
  );
  fireEvent.changeText(confirmPasswordInput, confirmPassword);
};

describe("Signup Form Tests", () => {
  beforeEach(() => {
    component = mountComponent(<Signup />, SupportedLanguages.English);
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
      confirmPassword: "testPassword",
    };

    const mockResponse: ApiResponse<ApiSignupResponse> = {
      isError: false,
      value: userTokenPair,
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
});
