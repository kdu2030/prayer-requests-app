import "expo-router/entry";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { registerRootComponent } from "expo";
import { router } from "expo-router";
import * as ScreenOrientation from "expo-screen-orientation";
import { StatusBar } from "expo-status-bar";
import { NativeWindStyleSheet } from "nativewind";
import * as React from "react";
import { View } from "react-native";
import {
  ActivityIndicator,
  Snackbar,
  Text,
  useTheme,
} from "react-native-paper";

import { getUserSummaryRaw } from "../api/get-user-summary";
import {
  REFRESH_TOKEN_STORAGE_KEY,
  USER_ID_STORAGE_KEY,
} from "../components/authentication/auth-constants";
import { decodeJwtToken } from "../components/authentication/auth-helpers";
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
  const [isErrorVisible, setIsErrorVisible] = React.useState<boolean>(false);
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
    if (response.isError) {
      setIsErrorVisible(true);
    }

    // TODO: Revert after fixing extra space issue
    if (true || response.isError || response.value == null) {
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
      setIsErrorVisible(true);
      router.push("/auth/welcome");
      return;
    }

    const userData = mapUserData(userSummaryResponse.value);
    setUserData(userData);

    const tokens = mapUserTokens(userSummaryResponse.value);
    setUserTokens(tokens);

    router.push("/(drawer)/home");
  };

  React.useEffect(() => {
    ScreenOrientation.unlockAsync();
    loadUserData();
  }, []);

  return (
    <>
      {/* <StatusBar backgroundColor={theme.colors.background} /> */}
      <View
        className="flex items-center justify-center flex-1"
        style={{ backgroundColor: theme.colors.background }}
      >
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
