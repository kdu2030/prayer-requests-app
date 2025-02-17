import { Feather, Ionicons, SimpleLineIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import * as React from "react";
import { ImageBackground, View } from "react-native";
import { useTheme } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { PrayerGroupDetails } from "../../../types/prayer-group-types";
import { PrayerGroupHeaderButtons } from "./prayer-group-header-buttons";

type Props = {
  prayerGroupDetails: PrayerGroupDetails | undefined;
};

export const PrayerGroupHeader: React.FC<Props> = ({ prayerGroupDetails }) => {
  const theme = useTheme();
  const { top } = useSafeAreaInsets();

  return (
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
          <Ionicons name="arrow-back-sharp" size={28} color={"white"} />
        </PrayerGroupHeaderButtons>
        <View className="flex flex-row justify-self-end">
          {prayerGroupDetails?.isUserJoined && (
            <View className="mr-2">
              <PrayerGroupHeaderButtons onPress={() => {}}>
                <Feather name="plus" size={28} color={"white"} />
              </PrayerGroupHeaderButtons>
            </View>
          )}
          <PrayerGroupHeaderButtons onPress={() => {}}>
            <View>
              <SimpleLineIcons
                className=""
                name="options-vertical"
                size={28}
                color={"white"}
              />
            </View>
          </PrayerGroupHeaderButtons>
        </View>
      </View>
    </ImageBackground>
  );
};
