import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { View } from "react-native";
import { useTheme } from "react-native-paper";

export const PrayerGroupSectionHeader: React.FC = () => {
  const theme = useTheme();

  return (
    <>
      <StatusBar backgroundColor={theme.colors.primary} />
      <View
        className="flex-row items-center justify-between w-full p-4"
        style={{ backgroundColor: theme.colors.primary }}
      >
        <MaterialCommunityIcons name="close" size={28} color="white" />
      </View>
    </>
  );
};
