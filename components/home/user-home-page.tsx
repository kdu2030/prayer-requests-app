import * as React from "react";
import { useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

import { useApiDataContext } from "../../hooks/use-api-data";
import { NoGroupsPlaceholder } from "./no-groups-placeholder";

export const UserHomePage: React.FC = () => {
  const theme = useTheme();
  const { userData } = useApiDataContext();

  const joinedNoPrayerGroups =
    !userData?.prayerGroups || userData.prayerGroups.length === 0;

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
