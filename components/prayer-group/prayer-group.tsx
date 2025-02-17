import { Feather, Ionicons, Octicons } from "@expo/vector-icons";
import { router, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Text, useTheme } from "react-native-paper";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

import { PrayerGroupHeaderButtons } from "./header/prayer-group-header-buttons";

type Props = {
  prayerGroupId: number;
};

export const PrayerGroup: React.FC<Props> = ({ prayerGroupId }) => {
  const theme = useTheme();
  const { left, right, top, bottom } = useSafeAreaInsets();

  return (
    <>
      <StatusBar translucent />
      <View
        style={{
          paddingLeft: left,
          paddingRight: right,
          paddingBottom: bottom,
        }}
      >
        <View
          className="w-full px-4 py-2 flex-row justify-between items-center"
          style={{
            minHeight: 100,
            backgroundColor: theme.colors.primary,
            paddingTop: top,
          }}
        >
          <PrayerGroupHeaderButtons onPress={() => router.back()}>
            <Ionicons name="arrow-back-sharp" size={24} color={"white"} />
          </PrayerGroupHeaderButtons>
          <View className="justify-self-end">
            <PrayerGroupHeaderButtons onPress={() => {}}>
              <Feather name="plus" size={24} color={"white"} />
            </PrayerGroupHeaderButtons>
          </View>
        </View>
        {/**TODO: Figure out safe area insets since we need content in the banner*/}
        {/** Note: Add spinner instead of skeleton */}
      </View>
    </>
  );
};
