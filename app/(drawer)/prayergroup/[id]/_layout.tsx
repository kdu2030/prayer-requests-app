import { Stack } from "expo-router";
import * as React from "react";

import { PrayerGroupContextProvider } from "../../../../components/prayer-group/prayer-group-context";

const PrayerGroupLayout: React.FC = () => {
  return (
    <PrayerGroupContextProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </PrayerGroupContextProvider>
  );
};

export default PrayerGroupLayout;
