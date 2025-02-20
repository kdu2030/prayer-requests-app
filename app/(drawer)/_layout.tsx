import {
  DrawerContentComponentProps,
  DrawerHeaderProps,
} from "@react-navigation/drawer";
import { Drawer } from "expo-router/drawer";
import * as React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { DrawerContent } from "../../components/navigation/drawer-content";
import { DrawerHeader } from "../../components/navigation/drawer-header";

const DrawerLayout: React.FC = () => {
  return (
    <GestureHandlerRootView className="flex-1">
      <Drawer
        screenOptions={{
          header: (props: DrawerHeaderProps) => <DrawerHeader {...props} />,
        }}
        drawerContent={(props: DrawerContentComponentProps) => (
          <DrawerContent {...props} />
        )}
        backBehavior="history"
      >
        <Drawer.Screen name="prayergroup/[id]" />
      </Drawer>
    </GestureHandlerRootView>
  );
};

export default DrawerLayout;
