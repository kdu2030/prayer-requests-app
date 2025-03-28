import { MaterialIcons } from "@expo/vector-icons";
import { Href, router } from "expo-router";
import * as React from "react";
import { View } from "react-native";
import { Button, useTheme } from "react-native-paper";
import { Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

import { useI18N } from "../../../hooks/use-i18n";
import { usePrayerGroupContext } from "../prayer-group-context";
import { PrayerGroupSectionHeader } from "../section-header/prayer-group-section-header";

export const PrayerGroupPermissionError: React.FC = () => {
  const { translate } = useI18N();
  const theme = useTheme();
  const { prayerGroupDetails } = usePrayerGroupContext();

  const goBackToGroup = () => {
    if (!prayerGroupDetails?.prayerGroupId) {
      return;
    }

    router.push({
      pathname: "/prayergroup/[id]",
      params: { id: prayerGroupDetails.prayerGroupId },
    } as Href<any>);
  };

  return (
    <SafeAreaView className="flex-1">
      <PrayerGroupSectionHeader
        title={translate("prayerGroup.permissionError.header")}
      />
      <View
        className="flex items-center justify-center flex-1 px-6"
        style={{
          backgroundColor: theme.colors.background,
        }}
      >
        <MaterialIcons name="warning" size={70} color={theme.colors.error} />
        <Text className="mt-5" variant="titleMedium">
          {translate("prayerGroup.permissionError.message")}
        </Text>

        <Button mode="contained" className="mt-5" onPress={goBackToGroup}>
          {translate("prayerGroup.permissionError.goBackToGroup")}
        </Button>
      </View>
    </SafeAreaView>
  );
};
