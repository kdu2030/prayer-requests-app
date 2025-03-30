import { MaterialIcons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { TouchableOpacity, View } from "react-native";
import { useTheme } from "react-native-paper";
import { Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

import { useI18N } from "../../hooks/use-i18n";

export const PrayerGroupSearch: React.FC = () => {
  const { translate } = useI18N();

  const theme = useTheme();

  return (
    <>
      <StatusBar backgroundColor={theme.colors.primary} />

      <SafeAreaView>
        <View className="flex flex-row items-center justify-between w-full px-4 py-4 grow">
          <View className="flex flex-row items-center">
            <TouchableOpacity onPress={() => {}} className="mr-2">
              <MaterialIcons name="arrow-back" size={28} color="white" />
            </TouchableOpacity>
            <Text variant="titleLarge" className="font-bold text-white">
              {translate("common.appName")}
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};
