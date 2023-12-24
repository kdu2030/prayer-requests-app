import * as React from "react";
import { PaperProvider } from "react-native-paper";
import { Text } from "react-native-paper";
import { AuthScreen } from "../components/authentication/auth-screen";
import { registerRootComponent } from "expo";
import "../i18n/i18n";
import { LanguageForm } from "../components/languages/language-form";
import { NativeWindStyleSheet } from "nativewind";
import "expo-router/entry";

const AppContainer: React.FC = () => {
  return <LanguageForm />;
};

NativeWindStyleSheet.setOutput({
  default: "native",
});

registerRootComponent(AppContainer);

export default AppContainer;
