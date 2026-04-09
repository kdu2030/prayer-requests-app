import { DrawerHeaderProps } from "@react-navigation/drawer";
import { useSegments } from "expo-router";
import * as React from "react";

import { ROUTES_WITHOUT_HEADER } from "../drawer-constants";

export const DrawerHeader: React.FC<DrawerHeaderProps> = (props) => {
  const segments = useSegments();
  const path = `/${segments.join("/")}`;

  if (ROUTES_WITHOUT_HEADER.includes(path)) {
    return <></>;
  }

  return <DrawerHeader {...props} />;
};
