import { Ionicons } from "@expo/vector-icons";
import { DrawerHeaderProps } from "@react-navigation/drawer";
import { usePathname } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";
import { useTheme } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useApiDataContext } from "../../hooks/use-api-data";
import { useI18N } from "../../hooks/use-i18n";
import { ProfilePicture } from "../layouts/profile-picture";

export const DrawerHeader: React.FC<DrawerHeaderProps> = ({ navigation }) => {
  const { translate } = useI18N();
  const { userData } = useApiDataContext();
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  const pathname = usePathname();

  if (
    pathname.startsWith("/prayergroup") &&
    (pathname.includes("about") ||
      pathname.includes("edit") ||
      pathname.includes("users"))
  ) {
    return null;
  }

  return (
    <>
      <StatusBar backgroundColor={theme.colors.primary} />

      <View
        className="flex flex-row items-center justify-between w-full px-4 pb-4 pt-6 grow"
        style={{
          backgroundColor: theme.colors.primary,
          paddingTop: insets.top + 16,
        }}
      >
        <View className="flex flex-row items-center">
          <TouchableOpacity
            onPress={() => navigation.openDrawer()}
            className="mr-2"
          >
            <Ionicons name="menu" size={28} color="white" />
          </TouchableOpacity>
          <Text variant="titleLarge" className="font-bold text-white">
            {translate("common.appName")}
          </Text>
        </View>

        <View className="flex flex-row items-center">
          <TouchableOpacity onPress={() => {}} className="mr-4">
            <Ionicons name="search" size={28} color="white" />
          </TouchableOpacity>

          <ProfilePicture url={userData?.image?.url} width={36} height={36} />
        </View>
      </View>
    </>
  );
};
