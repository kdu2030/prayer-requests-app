import { Drawer } from "expo-router/drawer";
import * as React from "react";

import { DrawerHeader } from "../../components/navigation/drawer-header";

const DrawerLayout: React.FC = () => {
  return <Drawer screenOptions={{ header: DrawerHeader }} />;
};

export default DrawerLayout;
