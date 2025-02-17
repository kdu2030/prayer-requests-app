import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

type Props = {
  prayerGroupId: number;
};

export const PrayerGroup: React.FC<Props> = ({ prayerGroupId }) => {
  const theme = useTheme();

  return (
    <>
      <StatusBar translucent />
      <View
        className="w-full"
        style={{ height: 100, backgroundColor: theme.colors.primary }}
      />
      {/**TODO: Figure out safe area insets since we need content in the banner*/}
      {/** Note: Add spinner instead of skeleton */}
      <SafeAreaView></SafeAreaView>
    </>
  );
};
