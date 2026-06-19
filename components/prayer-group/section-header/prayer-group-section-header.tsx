import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { TouchableOpacity, View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useApiDataContext } from "../../../hooks/use-api-data";
import { ProfilePicture } from "../../layouts/profile-picture";

type Props = {
  title?: string;
};

export const PrayerGroupSectionHeader: React.FC<Props> = ({ title }) => {
  const theme = useTheme();
  const { userData } = useApiDataContext();
  const insets = useSafeAreaInsets();

  return (
    <>
      <StatusBar translucent />
      <View
        className="flex flex-row justify-between w-full pb-4 px-4 items-center shadow-md z-10"
        style={{
          backgroundColor: theme.colors.background,
          paddingTop: insets.top + 16,
          shadowColor: theme.colors.shadow,
        }}
      >
        <View className="flex-row items-center">
          <TouchableOpacity onPress={() => router.back()}>
            <MaterialCommunityIcons
              name="close"
              size={28}
              color={theme.colors.onSurface}
            />
          </TouchableOpacity>

          {title && (
            <Text
              variant="titleLarge"
              className="ml-2 font-bold"
              numberOfLines={1}
              style={{ color: theme.colors.primary }}
            >
              {title}
            </Text>
          )}
        </View>
        <ProfilePicture url={userData?.image?.fileUrl} width={36} height={36} />
      </View>
    </>
  );
};
