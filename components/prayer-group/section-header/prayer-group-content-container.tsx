import * as React from "react";
import { useTheme } from "react-native-paper";
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
  const theme = useTheme();

  return (
    <>
      <PrayerGroupSectionHeader title={title} />
      <SafeAreaView
        className="flex flex-1"
        edges={["bottom", "left", "right"]}
        style={{ backgroundColor: theme.colors.background }}
      >
        {children}
      </SafeAreaView>
    </>
  );
};
