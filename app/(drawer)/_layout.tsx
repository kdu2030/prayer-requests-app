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
  const getDrawerContent = React.useCallback(
    (props: DrawerContentComponentProps) => {
      return <DrawerContent {...props} />;
    },
    [],
  );

  const screenOptions = React.useMemo(() => {
    return {
      lazy: true,
      header: (props: DrawerHeaderProps) => <DrawerHeader {...props} />,
    };
  }, []);

  return (
    <GestureHandlerRootView>
      <Drawer
        screenOptions={screenOptions}
        drawerContent={getDrawerContent}
        backBehavior="history"
      >
        <Drawer.Screen
          name="prayergroup/[id]"
          options={{ popToTopOnBlur: true }}
        />
        <Drawer.Screen name="search" options={{ headerShown: false }} />
      </Drawer>
    </GestureHandlerRootView>
  );
};

export default DrawerLayout;
