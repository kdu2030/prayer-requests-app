import { MaterialIcons } from "@expo/vector-icons";
import { Href, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { FlatList, TouchableOpacity, View } from "react-native";
import { Text, TouchableRipple, useTheme } from "react-native-paper";
import { TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

import { useI18N } from "../../hooks/use-i18n";
import { ProfilePicture } from "../layouts/profile-picture";
import { PrayerGroupSearchTestIds } from "./tests/test-ids";
import { usePrayerGroupSearch } from "./use-prayer-group-search";

export const PrayerGroupSearch: React.FC = () => {
  const { translate } = useI18N();

  const theme = useTheme();
  const { placeholderMessage, groupQuery, onChangeQuery, groupSearchResults } =
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
              testID={PrayerGroupSearchTestIds.searchInput}
            />
          </View>
        </View>

        {placeholderMessage && (
          <View className="flex flex-row items-center justify-center my-16">
            <Text
              variant="bodyLarge"
              className="font-bold"
              testID={PrayerGroupSearchTestIds.prayerGroupPlaceholder}
            >
              {placeholderMessage}
            </Text>
          </View>
        )}

        {groupSearchResults.length > 0 && (
          <View className="flex flex-col mt-4 mx-4">
            <FlatList
              data={groupSearchResults}
              testID={PrayerGroupSearchTestIds.prayerGroupResultsList}
              renderItem={({ item: group }) => (
                <TouchableRipple
                  rippleColor={"rgba(0, 0, 0, 0.12)"}
                  onPress={() =>
                    router.push({
                      pathname: "/prayergroup/[id]",
                      params: { id: group.prayerGroupId },
                    } as Href<any>)
                  }
                  style={{ borderRadius: 8, marginBottom: 8 }}
                  borderless
                  testID={PrayerGroupSearchTestIds.prayerGroupResult}
                >
                  <View className="flex-row gap-x-3 items-center px-4 py-2">
                    <ProfilePicture
                      url={group.imageFile?.url}
                      width={36}
                      height={36}
                    />
                    <Text variant="titleMedium">{group.groupName}</Text>
                  </View>
                </TouchableRipple>
              )}
            />
          </View>
        )}
      </SafeAreaView>
    </>
  );
};
