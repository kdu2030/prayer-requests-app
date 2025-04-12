import { Stack } from "expo-router";
import * as React from "react";

import { PrayerGroupContextProvider } from "../../../../components/prayer-group/prayer-group-context";

const PrayerGroupLayout: React.FC = () => {
  return (
    <PrayerGroupContextProvider>
      <Stack screenOptions={{ headerShown: false, freezeOnBlur: true }}>
        <Stack.Screen name="users" />
      </Stack>
    </PrayerGroupContextProvider>
  );
};

export default PrayerGroupLayout;
