import { Drawer } from "expo-router/drawer";
import * as React from "react";

import { DrawerTitle } from "../../components/navigation/drawer-title";

const DrawerLayout: React.FC = () => {
  return <Drawer screenOptions={{ headerTitle: DrawerTitle }} />;
};

export default DrawerLayout;
