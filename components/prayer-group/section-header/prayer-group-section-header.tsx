import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Text, useTheme } from "react-native-paper";

type Props = {
  title: string;
};

export const PrayerGroupSectionHeader: React.FC<Props> = ({ title }) => {
  const theme = useTheme();

  return (
    <>
      <StatusBar backgroundColor={theme.colors.primary} />
      <View
        className="flex-row items-center w-full p-4"
        style={{ backgroundColor: theme.colors.primary }}
      >
        <TouchableOpacity onPress={() => router.back()}>
          <MaterialCommunityIcons name="close" size={28} color="white" />
        </TouchableOpacity>

        <Text variant="titleLarge" className="ml-2 text-white font-bold">
          {title}
        </Text>
      </View>
    </>
  );
};
