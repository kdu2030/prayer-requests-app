import { Ionicons } from "@expo/vector-icons";
import { DrawerHeaderProps } from "@react-navigation/drawer";
import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { TouchableOpacity, View } from "react-native";
import { useTheme } from "react-native-paper";
import { Text } from "react-native-paper";

import { useI18N } from "../../hooks/use-i18n";

export const DrawerHeader: React.FC<DrawerHeaderProps> = ({ navigation }) => {
  const { translate } = useI18N();
  const theme = useTheme();

  return (
    <>
      <StatusBar style="auto" />
      <View className="flex flex-row items-center w-full px-2 py-4 pt-6">
        <View className="flex flex-row">
          <TouchableOpacity
            onPress={() => navigation.openDrawer()}
            className="mr-2"
          >
            <Ionicons name="menu" size={24} color="black" />
          </TouchableOpacity>
          <Text
            variant="titleLarge"
            className="font-bold"
            style={{ color: theme.colors.primary }}
          >
            {translate("common.appName")}
          </Text>

          <TouchableOpacity onPress={() => {}} className="mr-2">
            <Ionicons name="search" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};
