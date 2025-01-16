import { Ionicons } from "@expo/vector-icons";
import { DrawerHeaderProps } from "@react-navigation/drawer";
import * as React from "react";
import { TouchableOpacity, View } from "react-native";
import { useTheme } from "react-native-paper";
import { Text } from "react-native-paper";

import { useI18N } from "../../hooks/use-i18n";
import { THEME_COLORS } from "../../constants/theme/theme";

export const DrawerHeader: React.FC<DrawerHeaderProps> = ({ navigation }) => {
  const { translate } = useI18N();
  const theme = useTheme();

  return (
    <>
      <View
        className="flex flex-row items-center justify-between w-full px-2 py-4 pt-6 grow"
        style={{ backgroundColor: theme.colors.primary }}
      >
        <View className="flex flex-row">
          <TouchableOpacity
            onPress={() => navigation.openDrawer()}
            className="mr-2"
          >
            <Ionicons name="menu" size={24} color="white" />
          </TouchableOpacity>
          <Text variant="titleLarge" className="font-bold text-white">
            {translate("common.appName")}
          </Text>
        </View>

        <TouchableOpacity onPress={() => {}} className="mr-2">
          <Ionicons name="search" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </>
  );
};
