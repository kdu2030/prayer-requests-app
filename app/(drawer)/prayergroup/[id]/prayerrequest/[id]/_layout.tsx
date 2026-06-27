import { Stack } from "expo-router";
import * as React from "react";

const PrayerRequestLayout: React.FC = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="edit" />
    </Stack>
  );
};

export default PrayerRequestLayout;
