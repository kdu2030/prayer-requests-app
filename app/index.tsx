import "expo-router/entry";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { registerRootComponent } from "expo";
import { router } from "expo-router";
import { NativeWindStyleSheet } from "nativewind";
import * as React from "react";
import { View } from "react-native";
import { ActivityIndicator, Snackbar, Text } from "react-native-paper";

import { getUserSummaryRaw } from "../api/get-user-summary";
import {
  REFRESH_TOKEN_STORAGE_KEY,
  USER_ID_STORAGE_KEY,
} from "../components/authentication/auth-constants";
import { decodeJwtToken } from "../components/authentication/auth-helpers";
import { useApiDataContext } from "../hooks/use-api-data";
import { useI18N } from "../hooks/use-i18n";

type StoredUserData = {
  refreshToken: string;
  userId: number;
};

const AppContainer: React.FC = () => {
  const { loadLanguage, translate } = useI18N();
  const [isErrorVisible, setIsErrorVisible] = React.useState<boolean>(false);
  const { setUserTokens, userTokens, baseUrl } = useApiDataContext();

  const checkStoredUserDataValidity = async (): Promise<
    StoredUserData | undefined
  > => {
    const [userIdStr, refreshToken] = await Promise.all([
      AsyncStorage.getItem(USER_ID_STORAGE_KEY),
      AsyncStorage.getItem(REFRESH_TOKEN_STORAGE_KEY),
    ]);

    const userId = Number.parseInt(userIdStr ?? "");

    const refreshTokenExpiryDate = refreshToken
      ? decodeJwtToken(refreshToken).tokenExpiryDate
      : undefined;

    if (
      Number.isNaN(userId) ||
      refreshToken == null ||
      refreshTokenExpiryDate == null ||
      refreshTokenExpiryDate <= new Date()
    ) {
      router.push("/auth/welcome");
      return;
    }

    setUserTokens({ ...userTokens, refreshToken, refreshTokenExpiryDate });
    return { userId, refreshToken };
  };

  const loadUserData = async () => {
    const response = await loadLanguage();
    if (response.isError) {
      setIsErrorVisible(true);
    }

    if (response.isError || response.value == null) {
      router.push("/language/language-picker");
      return;
    }

    const { refreshToken, userId } =
      (await checkStoredUserDataValidity()) ?? {};

    if (!userId || !refreshToken) {
      return;
    }

    const userSummary = await getUserSummaryRaw(refreshToken, baseUrl, userId);
    console.log(userSummary);

    // TODO: Remove this?
    router.push("/auth/welcome");
  };

  React.useEffect(() => {
    loadUserData();
  }, []);

  return (
    <>
      <View className="flex items-center justify-center flex-1">
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
