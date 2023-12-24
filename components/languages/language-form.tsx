import * as React from "react";
import { Text } from "react-native-paper";
import { AuthContainer } from "../authentication/auth-container";
import { useTranslation } from "react-i18next";
import { Menu, Button } from "react-native-paper";
import { LANGUAGE_OPTIONS } from "../../constants/languages";
import { useI18N } from "../../hooks/use-i18n";
import { Select } from "../inputs/select";
import { getLanguageDropdownOptions } from "./helpers/language-helper";
import { SupportedLanguages } from "../../types/languages";
import { View } from "react-native";
import { router } from "expo-router";

export const LanguageForm: React.FC = () => {
  const { translate, i18n, setLanguage } = useI18N();

  const onClick = () => {
    //TODO: Save language to local storage here
    router.push("/auth/welcome");
  };

  return (
    <AuthContainer classNames="w-full px-3 mt-8" containerClassNames="h-1/3">
      <Text variant="titleMedium" className="mb-3">
        {translate("language.chooseLanguage.text")}
      </Text>
      <Select
        label={translate("language.chooseLanguage.label")}
        options={getLanguageDropdownOptions(translate)}
        value={i18n.language}
        setValue={async (value: SupportedLanguages) => {
          await setLanguage(value);
        }}
      />
      <Button mode="contained" className="mt-8" onPress={onClick}>
        {translate("common.actions.save")}
      </Button>
    </AuthContainer>
  );
};
