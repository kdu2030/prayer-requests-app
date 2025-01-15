import { Drawer } from "expo-router/drawer";
import * as React from "react";

import { DrawerHeaderTitle } from "../../components/navigation/drawer-title";

const DrawerLayout: React.FC = () => {
  return <Drawer screenOptions={{ headerTitle: DrawerHeaderTitle }} />;
};

export default DrawerLayout;
