import "../i18n/i18n";

import { Stack } from "expo-router";
import * as React from "react";
import { PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { LIGHT_THEME } from "../constants/theme/theme";
import { APIDataContextProvider } from "../hooks/use-api-data";

const BaseStack: React.FC = () => {
  return (
    <SafeAreaProvider>
      <PaperProvider theme={LIGHT_THEME}>
        <APIDataContextProvider>
          <Stack screenOptions={{ headerShown: false }} />
        </APIDataContextProvider>
      </PaperProvider>
    </SafeAreaProvider>
  );
};

export default BaseStack;
