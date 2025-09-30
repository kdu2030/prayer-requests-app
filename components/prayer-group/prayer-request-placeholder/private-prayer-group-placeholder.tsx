import * as React from "react";
import { useI18N } from "../../../hooks/use-i18n";
import { View } from "react-native";
import { Foundation } from "@expo/vector-icons";
import { Text } from "react-native-paper";

export const PrivatePrayerGroupPlaceholder: React.FC = () => {
  const { translate } = useI18N();

  return (
    <View className="items-center mx-4">
      <Foundation name="lock" size={64} />
      <Text className="mt-5" variant="titleMedium">
        {translate("prayerGroup.joinRequest.label")}
      </Text>
    </View>
  );
};
