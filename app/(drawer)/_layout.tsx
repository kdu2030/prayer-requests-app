import { Drawer } from "expo-router/drawer";
import * as React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { DrawerHeader } from "../../components/navigation/drawer-header";

const DrawerLayout: React.FC = () => {
  return (
    <GestureHandlerRootView className="flex-1">
      <Drawer screenOptions={{ header: DrawerHeader }} />
    </GestureHandlerRootView>
  );
};

export default DrawerLayout;
