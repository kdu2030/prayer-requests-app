import { Feather, Ionicons, SimpleLineIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { View } from "react-native";
import { useTheme } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

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
          <View className="flex flex-row justify-self-end">
            <View className="mr-2">
              <PrayerGroupHeaderButtons onPress={() => {}}>
                <Feather name="plus" size={24} color={"white"} />
              </PrayerGroupHeaderButtons>
            </View>
            <PrayerGroupHeaderButtons onPress={() => {}}>
              <View className="px-0">
                <SimpleLineIcons
                  className=""
                  name="options-vertical"
                  size={24}
                  color={"white"}
                />
              </View>
            </PrayerGroupHeaderButtons>
          </View>
        </View>

        {/** Note: Add spinner instead of skeleton */}
      </View>
    </>
  );
};
