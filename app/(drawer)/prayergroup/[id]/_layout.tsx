import { Stack } from "expo-router";
import * as React from "react";

import { PrayerGroupContextProvider } from "../../../../components/prayer-group/prayer-group-context";
import { PrayerRequestContextProvider } from "../../../../components/prayer-request/prayer-request-context";

const PrayerGroupLayout: React.FC = () => {
  return (
    <PrayerGroupContextProvider>
      <PrayerRequestContextProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="users" />
          <Stack.Screen name="create" />
          <Stack.Screen name="join-requests" />
          <Stack.Screen name="edit" />
          <Stack.Screen name="about" />
          <Stack.Screen name="index" />
          <Stack.Screen name="prayerrequest/[id]" />
        </Stack>
      </PrayerRequestContextProvider>
    </PrayerGroupContextProvider>
  );
};

export default PrayerGroupLayout;
