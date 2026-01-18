import { Drawer } from "expo-router/drawer";
import * as React from "react";

import { PrayerGroupContextProvider } from "../../../../components/prayer-group/prayer-group-context";
import { PrayerRequestContextProvider } from "../../../../components/prayer-request/prayer-request-context";

const PrayerGroupLayout: React.FC = () => {
  return (
    <PrayerGroupContextProvider>
      <PrayerRequestContextProvider>
        <Drawer screenOptions={{ headerShown: false }} backBehavior="history">
          <Drawer.Screen name="users" options={{ popToTopOnBlur: true }} />
          <Drawer.Screen name="create" />
          <Drawer.Screen name="join-requests" />
          <Drawer.Screen name="edit" />
          <Drawer.Screen name="about" />
          <Drawer.Screen name="index" />
        </Drawer>
      </PrayerRequestContextProvider>
    </PrayerGroupContextProvider>
  );
};

export default PrayerGroupLayout;
