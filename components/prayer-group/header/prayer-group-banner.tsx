import * as React from "react";
import { Image } from "react-native";
import { useTheme } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Props = {
  uri: string | undefined;
};

export const PrayerGroupBanner: React.FC<Props> = ({ uri }) => {
  const theme = useTheme();
  const { top } = useSafeAreaInsets();

  return (
    <Image
      source={{ uri }}
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
