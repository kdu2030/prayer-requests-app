import { Drawer } from "expo-router/drawer";
import * as React from "react";

import { PrayerGroupContextProvider } from "../../../../components/prayer-group/prayer-group-context";

const PrayerGroupLayout: React.FC = () => {
  return (
    <PrayerGroupContextProvider>
      <Drawer screenOptions={{ headerShown: false }} backBehavior="history">
        <Drawer.Screen name="users" options={{ unmountOnBlur: true }} />
        <Drawer.Screen name="create" />
        <Drawer.Screen name="join-requests" />
        <Drawer.Screen name="edit" />
        <Drawer.Screen name="about" />
        <Drawer.Screen name="index" />
      </Drawer>
    </PrayerGroupContextProvider>
  );
};

export default PrayerGroupLayout;
