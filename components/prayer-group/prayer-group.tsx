import { Ionicons } from "@expo/vector-icons";
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

type Props = {
  prayerGroupId: number;
};

export const PrayerGroup: React.FC<Props> = ({ prayerGroupId }) => {
  const theme = useTheme();
  const { left, right, top, bottom } = useSafeAreaInsets();
  const segments = useSegments();

  React.useEffect(() => {
    console.log(segments);
  }, [segments]);

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
          className="w-full px-4 justify-center"
          style={{
            height: 100,
            backgroundColor: theme.colors.primary,
            paddingTop: top,
          }}
        >
          <TouchableOpacity
            className="rounded-full p-1 self-start"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back-sharp" size={24} color={"white"} />
          </TouchableOpacity>
        </View>
        {/**TODO: Figure out safe area insets since we need content in the banner*/}
        {/** Note: Add spinner instead of skeleton */}
      </View>
    </>
  );
};
