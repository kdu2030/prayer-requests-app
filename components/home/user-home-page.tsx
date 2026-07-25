import * as React from "react";
import { useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

import { useApiDataContext } from "../../hooks/use-api-data";
import { getJoinedPrayerGroups } from "../prayer-group/prayer-group-helpers";
import { NoGroupsPlaceholder } from "./no-groups-placeholder";

export const UserHomePage: React.FC = () => {
  const theme = useTheme();
  const { userData } = useApiDataContext();

  const joinedPrayerGroups = React.useMemo(() => {
    return getJoinedPrayerGroups(userData?.prayerGroups ?? []);
  }, [userData?.prayerGroups]);

  const joinedNoPrayerGroups = joinedPrayerGroups.length === 0;

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
