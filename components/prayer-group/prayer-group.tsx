import { Feather, Ionicons, SimpleLineIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { ImageBackground, View } from "react-native";
import { useTheme } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { PrayerGroupHeaderButtons } from "./header/prayer-group-header-buttons";
import { usePrayerGroup } from "./use-prayer-group";

type Props = {
  prayerGroupId: number;
};

export const PrayerGroup: React.FC<Props> = ({ prayerGroupId }) => {
  const theme = useTheme();
  const { left, right, top, bottom } = useSafeAreaInsets();
  const { prayerGroupDetails } = usePrayerGroup(prayerGroupId);

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
        <ImageBackground
          source={{ uri: prayerGroupDetails?.bannerImageFile?.url }}
          style={{
            backgroundColor: theme.colors.primary,
            paddingTop: top,
          }}
          imageStyle={{ width: "100%", resizeMode: "cover" }}
        >
          <View className="px-4 py-4 flex-row justify-between items-center">
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
                <View>
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
        </ImageBackground>
      </View>

      {/** Note: Add spinner instead of skeleton */}
    </>
  );
};
