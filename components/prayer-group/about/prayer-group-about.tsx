import * as React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { PrayerGroupSectionHeader } from "../section-header/prayer-group-section-header";

export const PrayerGroupAbout: React.FC = () => {
  return (
    <SafeAreaView className="flex flex-1">
      <PrayerGroupSectionHeader />
    </SafeAreaView>
  );
};
