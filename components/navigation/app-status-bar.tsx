import { StatusBar } from "expo-status-bar";
import * as React from "react";

import { useUIContext } from "../../hooks/use-ui-context";

export const AppStatusBar: React.FC = () => {
  const { statusBarStyles } = useUIContext();
  return (
    <StatusBar
      backgroundColor={statusBarStyles.backgroundColor}
      hidden={statusBarStyles.isHidden}
    />
  );
};
