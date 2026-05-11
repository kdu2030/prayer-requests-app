import { Stack } from "expo-router";
import * as React from "react";

const PrayerRequestLayout: React.FC = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="[id]" />
    </Stack>
  );
};

export default PrayerRequestLayout;
