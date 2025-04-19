import mockAsyncStorage from "@react-native-async-storage/async-storage/jest/async-storage-mock";
import { render } from "@testing-library/react-native";
import * as React from "react";
import { PaperProvider } from "react-native-paper";

import { LIGHT_THEME } from "../../constants/theme/theme";
import { ApiDataContextProvider } from "../../hooks/use-api-data";
import i18n from "../../i18n/i18n";
import { CultureCode } from "../../types/languages";

jest.mock("@react-native-async-storage/async-storage", () => mockAsyncStorage);

export const mountComponent = (
  component: React.ReactNode,
  language: CultureCode = CultureCode.English
) => {
  jest.useFakeTimers();

  i18n.changeLanguage(language);

  return render(
    <PaperProvider theme={LIGHT_THEME}>
      <ApiDataContextProvider>{component}</ApiDataContextProvider>
    </PaperProvider>
  );
};
