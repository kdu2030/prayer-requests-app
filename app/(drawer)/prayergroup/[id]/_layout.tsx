import Drawer from "expo-router/drawer";
import * as React from "react";

import { PrayerGroupContextProvider } from "../../../../components/prayer-group/prayer-group-context";

const PrayerGroupLayout: React.FC = () => {
  return (
    <PrayerGroupContextProvider>
      <Drawer screenOptions={{ headerShown: false }} backBehavior="history" />
    </PrayerGroupContextProvider>
  );
};

export default PrayerGroupLayout;
