import * as React from "react";
import { useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

import { PrayerGroupSectionHeader } from "../prayer-group/section-header/prayer-group-section-header";
import { PrayerRequestEntryPoint } from "./prayer-request-types";
import { usePrayerRequestPage } from "./use-prayer-request-page";

type Props = {
  prayerRequestId: number;
  entryPoint: PrayerRequestEntryPoint;
};

export const PrayerRequestPage: React.FC<Props> = ({ prayerRequestId }) => {
  const theme = useTheme();
  const { prayerRequest } = usePrayerRequestPage(prayerRequestId);

  return (
    <SafeAreaView
      className="flex flex-1"
      style={{ backgroundColor: theme.colors.background }}
    >
      <PrayerGroupSectionHeader
        title={prayerRequest?.prayerGroup?.groupName ?? ""}
      />
    </SafeAreaView>
  );
};
