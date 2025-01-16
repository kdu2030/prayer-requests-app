import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { useTheme } from "react-native-paper";

export const AppStatusBar: React.FC = () => {
  const theme = useTheme();
  const getStatusBarColor = () => {
    // TODO: Add Handling based on route
    return theme.colors.primary;
  };

  return <StatusBar backgroundColor={getStatusBarColor()} />;
};
