import { Ionicons } from "@expo/vector-icons";
import { DrawerHeaderProps } from "@react-navigation/drawer";
import { router, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";
import { useTheme } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useApiDataContext } from "../../hooks/use-api-data";
import { useI18N } from "../../hooks/use-i18n";
import { ProfilePicture } from "../layouts/profile-picture";
import { ROUTES_WITHOUT_HEADER } from "./drawer-constants";

export const DrawerHeader: React.FC<DrawerHeaderProps> = ({ navigation }) => {
  const { translate } = useI18N();
  const { userData } = useApiDataContext();
  const theme = useTheme();

  const segments = useSegments();
  const path = `/${segments.join("/")}`;

  if (ROUTES_WITHOUT_HEADER.includes(path)) {
    return <></>;
  }

  const { top } = useSafeAreaInsets();

  return (
    <>
      <StatusBar translucent />

      <View
        className="flex flex-row items-center justify-between w-full px-4 pb-4 shadow-md z-10"
        style={{
          shadowColor: theme.colors.shadow,
          paddingTop: top + 16,
          backgroundColor: theme.colors.background,
        }}
      >
        <View className="flex flex-row items-center">
          <TouchableOpacity
            onPress={() => navigation.openDrawer()}
            className="mr-2"
          >
            <Ionicons name="menu" size={28} color={theme.colors.onSurface} />
          </TouchableOpacity>
          <Text
            variant="titleLarge"
            className="font-bold"
            style={{ color: theme.colors.primary }}
          >
            {translate("common.appName")}
          </Text>
        </View>

        <View className="flex flex-row items-center">
          <TouchableOpacity
            onPress={() => router.push("/(drawer)/search")}
            className="mr-4"
          >
            <Ionicons name="search" size={28} color={theme.colors.onSurface} />
          </TouchableOpacity>

          <ProfilePicture
            url={userData?.image?.fileUrl}
            width={36}
            height={36}
          />
        </View>
      </View>
    </>
  );
};
