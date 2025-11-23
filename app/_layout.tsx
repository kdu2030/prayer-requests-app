import "../i18n/i18n";

import { Stack } from "expo-router";
import * as React from "react";
import { PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { ToasterContextProvider } from "../components/toasters/toaster-context";
import { ToasterPortal } from "../components/toasters/toaster-portal";
import { LIGHT_THEME } from "../constants/theme/theme";
import { ApiDataContextProvider } from "../hooks/use-api-data";

const BaseStack: React.FC = () => {
  return (
    <SafeAreaProvider>
      <PaperProvider theme={LIGHT_THEME}>
        <ApiDataContextProvider>
          <ToasterContextProvider>
            <>
              <Stack screenOptions={{ headerShown: false }} />
              <ToasterPortal />
            </>
          </ToasterContextProvider>
        </ApiDataContextProvider>
      </PaperProvider>
    </SafeAreaProvider>
  );
};

export default BaseStack;
