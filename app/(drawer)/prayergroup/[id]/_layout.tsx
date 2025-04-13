import { Drawer } from "expo-router/drawer";
import * as React from "react";

import { PrayerGroupContextProvider } from "../../../../components/prayer-group/prayer-group-context";

const PrayerGroupLayout: React.FC = () => {
  return (
    <PrayerGroupContextProvider>
      <Drawer
        screenOptions={{ headerShown: false, freezeOnBlur: true }}
        backBehavior="history"
      >
        <Drawer.Screen name="users" options={{ unmountOnBlur: true }} />
      </Drawer>
    </PrayerGroupContextProvider>
  );
};

export default PrayerGroupLayout;
