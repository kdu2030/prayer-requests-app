import * as React from "react";
import { Text } from "react-native-paper";
import { AuthContainer } from "./auth-container";
import { useTranslation } from "react-i18next";
import { Menu, Button } from "react-native-paper";
import { LANGUAGE_OPTIONS } from "../../constants/languages";

export function LanguageForm() {
  const { t } = useTranslation();
  const [visible, setVisible] = React.useState<boolean>(false);

  function toggleMenuVisibility() {
    setVisible(!visible);
  }

  const menuButton = (
    <Button onPress={toggleMenuVisibility}>{t("common.actions.select")}</Button>
  );

  return (
    <AuthContainer>
      <Text variant="displaySmall">{t("language.chooseLanguage.text")}</Text>
      <Menu
        anchor={menuButton}
        visible={visible}
        onDismiss={() => setVisible(false)}
      >
        {LANGUAGE_OPTIONS.map((languageOption, index) => {
          const languageTitle = `${languageOption.icon} ${t(
            languageOption.displayOptionKey
          )}`;

          return <Menu.Item title={languageTitle} key={index} />;
        })}
      </Menu>
    </AuthContainer>
  );
}
