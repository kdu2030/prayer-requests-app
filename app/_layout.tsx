import "../i18n/i18n";

import { Stack } from "expo-router";
import * as React from "react";
import { PaperProvider } from "react-native-paper";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import { AppStatusBar } from "../components/navigation/app-status-bar";
import { LIGHT_THEME } from "../constants/theme/theme";
import { ApiDataContextProvider } from "../hooks/use-api-data";

const BaseStack: React.FC = () => {
  return (
    <SafeAreaView className="flex-1">
      <SafeAreaProvider>
        <PaperProvider theme={LIGHT_THEME}>
          <ApiDataContextProvider>
            <>
              <AppStatusBar />
              <Stack screenOptions={{ headerShown: false }} />
            </>
          </ApiDataContextProvider>
        </PaperProvider>
      </SafeAreaProvider>
    </SafeAreaView>
  );
};

export default BaseStack;
