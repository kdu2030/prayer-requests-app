import { Drawer } from "expo-router/drawer";
import * as React from "react";

import { DrawerContent } from "../../components/navigation/drawer-content";
import { DrawerHeader } from "../../components/navigation/drawer-header";

const DrawerLayout: React.FC = () => {
  return (
    <Drawer
      screenOptions={{
        header: (props) => <DrawerHeader {...props} />,
      }}
      drawerContent={(props) => <DrawerContent {...props} />}
    />
  );
};

export default DrawerLayout;
