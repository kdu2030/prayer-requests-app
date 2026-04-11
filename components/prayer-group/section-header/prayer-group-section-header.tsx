import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { TouchableOpacity, View } from "react-native";
import { Text, useTheme } from "react-native-paper";

import { useApiDataContext } from "../../../hooks/use-api-data";
import { ProfilePicture } from "../../layouts/profile-picture";

type Props = {
  title: string;
};

export const PrayerGroupSectionHeader: React.FC<Props> = ({ title }) => {
  const theme = useTheme();
  const { userData } = useApiDataContext();

  return (
    <>
      <StatusBar backgroundColor={theme.colors.primary} />
      <View
        className="flex flex-row justify-between w-full p-4 items-center"
        style={{ backgroundColor: theme.colors.primary }}
      >
        <View className="flex-row items-center">
          <TouchableOpacity onPress={() => router.back()}>
            <MaterialCommunityIcons name="close" size={28} color="white" />
          </TouchableOpacity>

          <Text
            variant="titleLarge"
            className="ml-2 text-white font-bold"
            numberOfLines={1}
          >
            {title}
          </Text>
        </View>
        <ProfilePicture url={userData?.image?.fileUrl} width={36} height={36} />
      </View>
    </>
  );
};
