import * as React from "react";
import { Text } from "react-native-paper";
import { AuthContainer } from "../authentication/auth-container";
import { Button } from "react-native-paper";
import { useI18N } from "../../hooks/use-i18n";
import { Select } from "../inputs/select";
import { getLanguageDropdownOptions } from "./helpers/language-helper";
import { SupportedLanguages } from "../../types/languages";
import { router } from "expo-router";

export const LanguageForm: React.FC = () => {
  const { translate, i18n, setLanguage, storeLanguage } = useI18N();

  const onClick = async () => {
    const response = await storeLanguage(i18n.language as SupportedLanguages);
    console.log(response);
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
