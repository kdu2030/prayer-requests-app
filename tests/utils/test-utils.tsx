import * as React from "react";
import { PaperProvider } from "react-native-paper";
import { LIGHT_THEME } from "../../constants/theme/theme";
import i18n from "../../i18n/i18n";
import { SupportedLanguages } from "../../types/languages";
import { render } from "@testing-library/react-native";

export const mountComponent = (
  component: React.ReactNode,
  language: SupportedLanguages = SupportedLanguages.English
) => {
  i18n.changeLanguage(language);

  return render(<PaperProvider theme={LIGHT_THEME}>{component}</PaperProvider>);
};
