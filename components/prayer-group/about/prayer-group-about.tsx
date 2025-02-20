import * as React from "react";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Text, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

import { useI18N } from "../../../hooks/use-i18n";
import { ProfilePicture } from "../../layouts/profile-picture";
import { usePrayerGroupContext } from "../prayer-group-context";
import { PrayerGroupSectionHeader } from "../section-header/prayer-group-section-header";

export const PrayerGroupAbout: React.FC = () => {
  const theme = useTheme();
  const { translate } = useI18N();
  const { prayerGroupDetails } = usePrayerGroupContext();

  return (
    <SafeAreaView
      className="flex flex-1"
      style={{ backgroundColor: theme.colors.background }}
    >
      <PrayerGroupSectionHeader
        title={translate("prayerGroup.about.header", {
          groupName: prayerGroupDetails?.groupName,
        })}
      />

      <ScrollView className="flex flex-1" automaticallyAdjustKeyboardInsets>
        <View className="p-4 flex-col gap-y-4">
          <View className="gap-y-2">
            <Text variant="bodyLarge" className="font-bold">
              {translate("createPrayerGroup.groupNameDescription.description")}
            </Text>

            <Text variant="bodyMedium">{prayerGroupDetails?.description}</Text>
          </View>

          <View className="gap-y-2">
            <Text variant="bodyLarge" className="font-bold">
              {translate("createPrayerGroup.rules.label")}
            </Text>

            <Text variant="bodyMedium">{prayerGroupDetails?.rules}</Text>
          </View>

          <View className="gap-y-2">
            <Text variant="bodyLarge" className="font-bold">
              {translate("prayerGroup.about.admins")}
            </Text>

            <View>
              {prayerGroupDetails?.admins?.map((admin) => {
                return (
                  <View className="flex-row items-center">
                    <ProfilePicture
                      url={admin.image?.url}
                      width={28}
                      height={28}
                    />
                    <Text className="ml-3" variant="bodyMedium">
                      {admin.fullName}
                    </Text>
                  </View>
                );
              })}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
