import { router } from "expo-router";
import * as React from "react";
import { View } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";

import { useI18N } from "../../hooks/use-i18n";
import { AuthContainer } from "./auth-container";
import { StatusBar } from "expo-status-bar";

export function AuthScreen() {
  const { translate } = useI18N();
  const theme = useTheme();

  return (
    <>
      <StatusBar translucent />
      <AuthContainer containerClassNames="h-3/4 portrait:h-1/2">
        <Text variant="displaySmall" className="mt-5 font-bold">
          {translate("authScreen.welcome.header")}
        </Text>
        <Text
          variant="displaySmall"
          className="font-bold"
          style={{ color: theme.colors.primary }}
        >
          {translate("common.appName")}
        </Text>
        <Text variant="bodyLarge" className="mt-3 text-gray-500">
          {translate("authScreen.tagline.text")}
        </Text>
        <View className="flex flex-row w-full mt-auto mb-10">
          <Button
            mode="contained"
            className="w-2/5 mr-3"
            onPress={() => router.push("/auth/sign-in")}
          >
            {translate("authScreen.signin.action")}
          </Button>
          <Button
            mode="outlined"
            className="w-2/5"
            onPress={() => router.push("/auth/sign-up")}
          >
            {translate("authScreen.signup.action")}
          </Button>
        </View>
      </AuthContainer>
    </>
  );
}
