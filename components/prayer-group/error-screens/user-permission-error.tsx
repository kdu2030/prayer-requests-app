import { MaterialIcons } from "@expo/vector-icons";
import * as React from "react";
import { View } from "react-native";
import { Button, useTheme } from "react-native-paper";
import { Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

import { useI18N } from "../../../hooks/use-i18n";
import { ErrorScreen } from "../../layouts/error-screen";
import { PrayerGroupSectionHeader } from "../section-header/prayer-group-section-header";

type Props = {
  onRetry: () => void;
};

export const PrayerGroupUsersError: React.FC<Props> = ({ onRetry }) => {
  const { translate } = useI18N();
  const theme = useTheme();

  return (
    <SafeAreaView className="flex-1">
      <PrayerGroupSectionHeader
        title={translate("prayerGroup.permissionError.header")}
      />
      <View
        className="flex items-center justify-center flex-1"
        style={{
          backgroundColor: theme.colors.background,
        }}
      >
        <MaterialIcons name="warning" size={70} color={theme.colors.error} />
        <Text className="mt-5" variant="titleMedium">
          {translate("prayerGroup.permissionError.message")}
        </Text>

        <Button mode="contained" className="mt-5" onPress={onRetry}>
          {translate("prayerGroup.permissionError.goBackToGroup")}
        </Button>
      </View>
    </SafeAreaView>
  );
};
