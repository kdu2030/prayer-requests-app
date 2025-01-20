import mockAsyncStorage from "@react-native-async-storage/async-storage/jest/async-storage-mock";
import { RenderResult, waitFor } from "@testing-library/react-native";
import * as React from "react";

import AppContainer from "../app/index";
import { SupportedLanguages } from "../types/languages";
import { mountComponent } from "./utils/test-utils";

jest.useFakeTimers();

let component: RenderResult;
const mockLoadLanguage = jest.fn();
const mockRouterPush = jest.fn();

jest.mock("@react-native-async-storage/async-storage", () => mockAsyncStorage);

jest.mock("expo-router/entry", () => ({
  match: jest.fn(),
}));

jest.mock("expo", () => ({
  registerRootComponent: jest.fn(),
  match: jest.fn(),
}));

jest.mock("expo-router", () => ({
  router: {
    push: (path: string) => mockRouterPush(path),
  },
}));

jest.mock("../hooks/use-i18n", () => ({
  useI18N: () => ({
    loadLanguage: () => mockLoadLanguage(),
    translate: () => "",
  }),
}));

describe("App Container Tests", () => {
  afterEach(() => {
    if (component) {
      component.unmount();
      mockLoadLanguage.mockReset();
      mockRouterPush.mockReset();
    }
  });

  test("No language picked", async () => {
    mockLoadLanguage.mockReturnValue({ isError: false });
    component = mountComponent(<AppContainer />);

    await waitFor(() => {
      expect(mockRouterPush).toHaveBeenCalledWith("/language/language-picker");
    });
  });

  test("Language picked but not signed in", async () => {
    mockLoadLanguage.mockReturnValue({
      isError: false,
      value: SupportedLanguages.English,
    });

    component = mountComponent(<AppContainer />);

    // Need update when user sign in check added

    await waitFor(() => {
      expect(mockRouterPush).toHaveBeenCalledWith("/auth/welcome");
    });
  });
});
