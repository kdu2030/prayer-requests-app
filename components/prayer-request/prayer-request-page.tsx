import * as React from "react";
import { useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

import { usePrayerGroupContext } from "../prayer-group/prayer-group-context";
import { PrayerGroupSectionHeader } from "../prayer-group/section-header/prayer-group-section-header";
import { PrayerRequestListCard } from "./prayer-request-list-card";

type Props = {
  prayerRequestId: number;
};

export const PrayerRequestPage: React.FC<Props> = () => {
  const theme = useTheme();
  const { prayerGroupDetails } = usePrayerGroupContext();

  return (
    <SafeAreaView
      className="flex flex-1"
      style={{ backgroundColor: theme.colors.background }}
    >
      <PrayerGroupSectionHeader title={prayerGroupDetails?.groupName ?? ""} />
    </SafeAreaView>
  );
};
