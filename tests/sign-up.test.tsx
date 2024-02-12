import * as React from "react";
import {
  RenderResult,
  fireEvent,
  waitFor,
} from "@testing-library/react-native";
import Signup from "../app/auth/sign-up";
import { mountComponent } from "./utils/test-utils";
import { SupportedLanguages } from "../types/languages";
import { SignupTestIds } from "../constants/auth/auth-constants";

jest.mock("@react-native-async-storage/async-storage", () => ({
  default: {
    setItem: jest.fn(),
    getItem: jest.fn(),
  },
}));

let component: RenderResult;

describe("Signup Form Tests", () => {
  beforeEach(() => {
    component = mountComponent(<Signup />, SupportedLanguages.English);
  });

  afterEach(() => {
    if (component) {
      component.unmount();
    }
  });

  test("Component mounts", () => {
    expect(component).not.toBeNull();
  });

  test("Invalid email prevents submit", async () => {
    const invalidEmail = "gmail.com";
    const emailInput = component.getByTestId(SignupTestIds.emailInput);
    fireEvent.changeText(emailInput, invalidEmail);

    const submitButton = await component.findByTestId(
      SignupTestIds.submitButton
    );

    console.log(submitButton.props);
  });
});
