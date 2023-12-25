import * as React from "react";
import { registerRootComponent } from "expo";
import { LanguageForm } from "../components/languages/language-form";
import { NativeWindStyleSheet } from "nativewind";
import "expo-router/entry";
import { useI18N } from "../hooks/use-i18n";

const AppContainer: React.FC = () => {
  const { loadLanguage } = useI18N();

  React.useEffect(() => {
    const loadLanguageFromStorage = async () => {
      const response = await loadLanguage();
      console.log(response);
    };

    loadLanguageFromStorage();
  }, []);

  return <LanguageForm />;
};

NativeWindStyleSheet.setOutput({
  default: "native",
});

registerRootComponent(AppContainer);

export default AppContainer;
