import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { TouchableOpacity, View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

import { useI18N } from "../../hooks/use-i18n";
import { usePrayerGroupSearch } from "./use-prayer-group-search";

export const PrayerGroupSearch: React.FC = () => {
  const { translate } = useI18N();

  const theme = useTheme();
  const { placeholderMessage, groupQuery, onChangeQuery } =
    usePrayerGroupSearch();

  return (
    <>
      <StatusBar backgroundColor={theme.colors.primary} />

      <SafeAreaView>
        <View
          className="flex flex-row items-center justify-between w-full pl-2 pr-4 py-2 grow"
          style={{ backgroundColor: theme.colors.primary }}
        >
          <View className="flex flex-row items-center">
            <TouchableOpacity onPress={() => router.back()} className="mr-2">
              <MaterialIcons name="arrow-back" size={28} color="white" />
            </TouchableOpacity>
            <TextInput
              value={groupQuery}
              onChangeText={onChangeQuery}
              mode="outlined"
              className="flex-1"
              placeholder={translate("prayerGroup.search.placeholder")}
              style={{ height: 44 }}
              left={<TextInput.Icon icon="magnify" />}
            />
          </View>
        </View>

        {placeholderMessage && (
          <View className="flex flex-row items-center justify-center my-16">
            <Text variant="bodyLarge" className="font-bold">
              {placeholderMessage}
            </Text>
          </View>
        )}
      </SafeAreaView>
    </>
  );
};
