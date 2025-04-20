import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

import {
  REFRESH_TOKEN_STORAGE_KEY,
  USER_ID_STORAGE_KEY,
  USER_TOKEN_STORAGE_KEY,
} from "../authentication/auth-constants";

export const useDrawerContent = () => {
  const onSignOut = async () => {
    await AsyncStorage.multiRemove([
      USER_ID_STORAGE_KEY,
      USER_TOKEN_STORAGE_KEY,
      REFRESH_TOKEN_STORAGE_KEY,
    ]);

    router.push("/auth/welcome");
  };

  return {
    onSignOut,
  };
};
