import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { Text } from "react-native-paper";
import { Button } from "react-native-paper";

import { useI18N } from "../../hooks/use-i18n";
import { CultureCode } from "../../types/languages";
import { AuthContainer } from "../authentication/auth-container";
import { Select } from "../inputs/select";
import { ErrorSnackbar } from "../layouts/error-snackbar";
import { getLanguageDropdownOptions } from "./helpers/language-helper";

export const LanguageForm: React.FC = () => {
  const { translate, i18n, setLanguage, storeLanguage } = useI18N();
  const [snackbarError, setSnackbarError] = React.useState<
    string | undefined
  >();

  const onClick = async () => {
    const response = await storeLanguage(i18n.language as CultureCode);
    if (response.isError) {
      setSnackbarError(
        translate("toaster.failed.saveFailure", {
          item: translate("language.setting.label").toLocaleLowerCase(),
        })
      );
      return;
    }
    router.push("/auth/welcome");
  };

  return (
    <>
      <StatusBar translucent />
      <AuthContainer
        classNames="w-full px-3 mt-8"
        containerClassNames="h-4/5 portrait:h-1/3"
      >
        <Text variant="titleMedium" className="mb-3">
          {translate("language.chooseLanguage.text")}
        </Text>
        <Select
          label={translate("language.chooseLanguage.label")}
          options={getLanguageDropdownOptions(translate)}
          value={i18n.language}
          setValue={async (value: CultureCode) => {
            await setLanguage(value);
          }}
        />
        <Button
          mode="contained"
          className="mt-20 portrait:mt-8"
          onPress={onClick}
        >
          {translate("common.actions.save")}
        </Button>
      </AuthContainer>

      <ErrorSnackbar
        snackbarError={snackbarError}
        setSnackbarError={setSnackbarError}
      />
    </>
  );
};
