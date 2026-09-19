import { MaterialIcons } from "@expo/vector-icons";
import * as React from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";

import { useI18N } from "../../hooks/use-i18n";

export const NoRecentPostsPlaceholder: React.FC = () => {
  const { translate } = useI18N();

  return (
    <View className="flex flex-col items-center mx-4 mt-32">
      <MaterialIcons name="chat" size={64} color="black" />

      <Text className="mt-5" variant="titleMedium">
        {translate("home.prayerRequests.noRecentPrayerRequests")}
      </Text>
    </View>
  );
};
