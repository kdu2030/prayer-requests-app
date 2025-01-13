import "expo-router/entry";

import { registerRootComponent } from "expo";
import { router } from "expo-router";
import { NativeWindStyleSheet } from "nativewind";
import * as React from "react";
import { View } from "react-native";
import { ActivityIndicator, Snackbar, Text } from "react-native-paper";

import { useI18N } from "../hooks/use-i18n";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  REFRESH_TOKEN_STORAGE_KEY,
  USER_TOKEN_STORAGE_KEY,
} from "../components/authentication/auth-constants";
import { decodeJwtToken } from "../components/authentication/auth-helpers";

const AppContainer: React.FC = () => {
  const { loadLanguage, translate } = useI18N();
  const [isErrorVisible, setIsErrorVisible] = React.useState<boolean>(false);

  const loadUserData = async () => {
    const response = await loadLanguage();
    if (response.isError) {
      setIsErrorVisible(true);
    }

    if (response.isError || response.value == null) {
      router.push("/language/language-picker");
      return;
    }

    const [accessToken, refreshToken] = await Promise.all([
      AsyncStorage.getItem(USER_TOKEN_STORAGE_KEY),
      AsyncStorage.getItem(REFRESH_TOKEN_STORAGE_KEY),
    ]);

    const refreshTokenExpiryDate = refreshToken
      ? decodeJwtToken(refreshToken).tokenExpiryDate
      : undefined;

    if (
      refreshToken == null ||
      refreshTokenExpiryDate == null ||
      refreshTokenExpiryDate >= new Date()
    ) {
      router.push("/auth/welcome");
      return;
    }

    // Logic missing: Check if user is signed in
    router.push("/auth/welcome");
  };

  React.useEffect(() => {
    loadUserData();
  }, []);

  return (
    <>
      <View className="flex flex-1 items-center justify-center">
        <ActivityIndicator animating={true} size={70} />
        <Text className="mt-5" variant="titleMedium">
          {translate("loading.userData.text")}
        </Text>
      </View>

      <Snackbar
        className="bg-red-700"
        duration={3000}
        visible={isErrorVisible}
        onDismiss={() => {
          setIsErrorVisible(false);
        }}
        onIconPress={() => setIsErrorVisible(false)}
      >
        {translate("toaster.failed.loadFailure", {
          item: translate("loading.userData.label").toLocaleLowerCase(),
        })}
      </Snackbar>
    </>
  );
};

NativeWindStyleSheet.setOutput({
  default: "native",
});

registerRootComponent(AppContainer);

export default AppContainer;
