import * as React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { PrayerGroupSectionHeader } from "./prayer-group-section-header";

type Props = {
  title?: string;
  children: React.ReactNode;
};

export const PrayerGroupContentContainer: React.FC<Props> = ({
  title,
  children,
}) => {
  return (
    <>
      <PrayerGroupSectionHeader title={title} />
      <SafeAreaView className="flex flex-1" edges={["bottom", "left", "right"]}>
        {children}
      </SafeAreaView>
    </>
  );
};
