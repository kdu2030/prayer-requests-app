import "../i18n/i18n";

import { Stack } from "expo-router";
import * as React from "react";
import { PaperProvider } from "react-native-paper";

import { LIGHT_THEME } from "../constants/theme/theme";

const BaseStack: React.FC = () => {
  return (
    <PaperProvider theme={LIGHT_THEME}>
      <Stack screenOptions={{ headerShown: false }} />
    </PaperProvider>
  );
};

export default BaseStack;
