import { StatusBar } from "expo-status-bar";
import * as React from "react";

import { useUIContext } from "../../hooks/use-ui-context";

export const AppStatusBar: React.FC = () => {
  const { statusBarStyles } = useUIContext();

  React.useEffect(() => {
    console.log(statusBarStyles);
  }, [statusBarStyles]);

  return <StatusBar backgroundColor={"red"} />;
};
