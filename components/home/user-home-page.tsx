import * as React from "react";
import { useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

import { UserHomePageBody } from "./user-home-page-body";

export const UserHomePage: React.FC = () => {
  const theme = useTheme();

  return (
    <SafeAreaView
      className="flex flex-1"
      edges={["bottom", "left", "right"]}
      style={{ backgroundColor: theme.colors.background }}
    >
      <UserHomePageBody />
    </SafeAreaView>
  );
};
