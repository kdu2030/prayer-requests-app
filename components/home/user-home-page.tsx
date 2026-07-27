import * as React from "react";
import { useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

import { NoGroupsPlaceholder } from "./no-groups-placeholder";
import { useUserHomePage } from "./use-user-home-page";

export const UserHomePage: React.FC = () => {
  const theme = useTheme();

  const { joinedNoPrayerGroups } = useUserHomePage();

  return (
    <SafeAreaView
      className="flex flex-1"
      edges={["bottom", "left", "right"]}
      style={{ backgroundColor: theme.colors.background }}
    >
      {joinedNoPrayerGroups && <NoGroupsPlaceholder />}
    </SafeAreaView>
  );
};
