import * as React from "react";
import { View } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";

import { useI18N } from "../../hooks/use-i18n";
import { AuthContainer } from "./auth-container";

export function AuthScreen() {
  const { translate } = useI18N();
  const theme = useTheme();

  return (
    <AuthContainer>
      <Text variant="displaySmall" className="font-bold mt-5">
        {translate("authScreen.welcome.header")}
      </Text>
      <Text
        variant="displaySmall"
        className="font-bold"
        style={{ color: theme.colors.primary }}
      >
        {translate("common.appName")}
      </Text>
      <Text variant="bodyLarge" className="text-gray-500 mt-3">
        {translate("authScreen.tagline.text")}
      </Text>
      <View className="flex flex-row w-full mt-auto mb-10">
        <Button mode="contained" className="w-2/5 mr-3">
          {translate("authScreen.signIn.action")}
        </Button>
        <Button mode="outlined" className="w-2/5">
          {translate("authScreen.signUp.action")}
        </Button>
      </View>
    </AuthContainer>
  );
}
