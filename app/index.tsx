import "expo-router/entry";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { registerRootComponent } from "expo";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { NativeWindStyleSheet } from "nativewind";
import * as React from "react";
import { View } from "react-native";
import { ActivityIndicator, Text, useTheme } from "react-native-paper";

import { getUserSummaryRaw } from "../api/get-user-summary";
import {
  REFRESH_TOKEN_STORAGE_KEY,
  USER_ID_STORAGE_KEY,
} from "../components/authentication/auth-constants";
import { decodeJwtToken } from "../components/authentication/jwt-helpers";
import { ErrorSnackbar } from "../components/layouts/error-snackbar";
import { sleep } from "../helpers/utils";
import { useApiDataContext } from "../hooks/use-api-data";
import { useI18N } from "../hooks/use-i18n";
import { mapUserData, mapUserTokens } from "../mappers/map-user-data";
import { Token } from "../types/context/api-data-context-type";

type StoredUserData = {
  refreshToken: string;
  userId: number;
};

const AppContainer: React.FC = () => {
  const { loadLanguage, translate } = useI18N();
  const [snackbarError, setSnackbarError] = React.useState<
    string | undefined
  >();
  const { setUserTokens, userTokens, baseUrl, setUserData } =
    useApiDataContext();
  const theme = useTheme();

  const checkStoredUserDataValidity = async (): Promise<
    StoredUserData | undefined
  > => {
    const [userIdStr, refreshToken] = await Promise.all([
      AsyncStorage.getItem(USER_ID_STORAGE_KEY),
      AsyncStorage.getItem(REFRESH_TOKEN_STORAGE_KEY),
    ]);

    const userId = Number.parseInt(userIdStr ?? "");

    const refreshTokenExpiryDate = refreshToken
      ? decodeJwtToken(refreshToken).expiryDate
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

    const storedRefreshToken: Token = {
      token: refreshToken,
      expiryDate: refreshTokenExpiryDate,
    };

    setUserTokens({ ...userTokens, refreshToken: storedRefreshToken });
    return { userId, refreshToken };
  };

  const loadUserData = async () => {
    const response = await loadLanguage();
  
    if (response.isError || response.value == null) {
      router.push("/language/language-picker");
      return;
    }

    const { refreshToken, userId } =
      (await checkStoredUserDataValidity()) ?? {};

    if (!userId || !refreshToken) {
      return;
    }

    const userSummaryResponse = await getUserSummaryRaw(
      refreshToken,
      baseUrl,
      userId
    );

    if (userSummaryResponse.isError) {
      setSnackbarError(
        translate("toaster.failed.loadFailure", {
          item: translate("loading.userData.label").toLocaleLowerCase(),
        })
      );
      setTimeout(() => router.push("/auth/welcome"), 1000);
      return;
    }

    const userData = mapUserData(userSummaryResponse.value);
    setUserData(userData);

    const tokens = mapUserTokens(userSummaryResponse.value);
    setUserTokens(tokens);

    router.push("/(drawer)/home");
  };

  React.useEffect(() => {
    loadUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <StatusBar backgroundColor={theme.colors.background} />
      <View
        className="flex items-center justify-center flex-1"
        style={{ backgroundColor: theme.colors.background }}
      >
        <ActivityIndicator animating={true} size={70} />
        <Text className="mt-5" variant="titleMedium">
          {translate("loading.userData.text")}
        </Text>
      </View>

      <ErrorSnackbar
        snackbarError={snackbarError}
        setSnackbarError={setSnackbarError}
      />
    </>
  );
};

NativeWindStyleSheet.setOutput({
  default: "native",
});

registerRootComponent(AppContainer);

export default AppContainer;
