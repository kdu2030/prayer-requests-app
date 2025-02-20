import * as React from "react";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Text, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

import { useI18N } from "../../../hooks/use-i18n";
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
        <View className="p-4">
          <Text variant="bodyLarge" className="font-bold mb-2">
            {translate("createPrayerGroup.groupNameDescription.description")}
          </Text>

          <Text variant="bodyMedium">{prayerGroupDetails?.description}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
