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

export const LanguageForm: React.FC = () => {
  const { translate, i18n, setLanguage } = useI18N();

  return (
    <AuthContainer classNames="w-full px-3 mt-5" containerClassNames="h-2/5">
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
    </AuthContainer>
  );
};
