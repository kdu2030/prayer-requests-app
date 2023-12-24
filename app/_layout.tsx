import * as React from "react";
import { Stack } from "expo-router";
import { PaperProvider } from "react-native-paper";

const BaseStack: React.FC = () => {
  return (
    <PaperProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </PaperProvider>
  );
};

export default BaseStack;
