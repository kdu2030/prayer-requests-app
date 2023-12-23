import * as React from "react";
import { PaperProvider } from "react-native-paper";
import { Text } from "react-native-paper";
import { AuthScreen } from "../components/authentication/auth-screen";
import { registerRootComponent } from "expo";
import "../i18n/i18n";
import { LanguageForm } from "../components/authentication/language-form";

const AppContainer: React.FC = () => {
  return (
    <PaperProvider>
      <LanguageForm />
    </PaperProvider>
  );
};

registerRootComponent(AppContainer);

export default AppContainer;
