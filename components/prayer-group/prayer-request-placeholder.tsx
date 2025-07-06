import { Ionicons } from "@expo/vector-icons";
import * as React from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";

import { useI18N } from "../../hooks/use-i18n";

export const PrayerRequestPlaceholder: React.FC = () => {
  const { translate } = useI18N();

  return (
    <View className="items-center mx-4">
      <Ionicons name="chatbox-outline" size={64} />
      <Text className="mt-5" variant="titleMedium">
        {translate("prayerRequest.prayerGroup.noPrayerRequests")}
      </Text>
    </View>
  );
};
