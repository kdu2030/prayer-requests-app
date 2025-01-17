import { Drawer } from "expo-router/drawer";
import * as React from "react";

import { DrawerContent } from "../../components/navigation/drawer-content";
import { DrawerHeader } from "../../components/navigation/drawer-header";

const DrawerLayout: React.FC = () => {
  return (
    <Drawer
      screenOptions={{
        header: DrawerHeader,
      }}
      drawerContent={DrawerContent}
    />
  );
};

export default DrawerLayout;
