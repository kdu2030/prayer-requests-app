import "../i18n/i18n";

import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { Stack } from "expo-router";
import * as React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { PrayerRequestDetailContextProvider } from "../components/prayer-request/prayer-request-detail-context";
import { ToasterContextProvider } from "../components/toasters/toaster-context";
import { ToasterPortal } from "../components/toasters/toaster-portal";
import { LIGHT_THEME } from "../constants/theme/theme";
import { ApiDataContextProvider } from "../hooks/use-api-data";

const BaseStack: React.FC = () => {
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView className="flex-1">
        <PaperProvider theme={LIGHT_THEME}>
          <BottomSheetModalProvider>
            <ApiDataContextProvider>
              <PrayerRequestDetailContextProvider>
                <ToasterContextProvider>
                  <>
                    <Stack screenOptions={{ headerShown: false }} />
                    <ToasterPortal />
                  </>
                </ToasterContextProvider>
              </PrayerRequestDetailContextProvider>
            </ApiDataContextProvider>
          </BottomSheetModalProvider>
        </PaperProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
};

export default BaseStack;
