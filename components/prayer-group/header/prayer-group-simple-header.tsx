import * as React from "react";
import { Image } from "react-native";
import { useTheme } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { PrayerGroupDetails } from "../../../types/prayer-group-types";

type Props = {
  prayerGroupDetails: PrayerGroupDetails | undefined;
};

export const PrayerGroupSimpleHeader: React.FC<Props> = ({
  prayerGroupDetails,
}) => {
  const theme = useTheme();
  const { top } = useSafeAreaInsets();

  return (
    <Image
      source={{ uri: prayerGroupDetails?.bannerImageFile?.url }}
      style={{
        backgroundColor: theme.colors.secondaryContainer,
        paddingTop: top,
        width: "100%",
        height: 80,
        resizeMode: "cover",
      }}
    />
  );
};
