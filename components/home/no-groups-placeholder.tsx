import { MaterialIcons } from "@expo/vector-icons";
import * as React from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";

import { useI18N } from "../../hooks/use-i18n";
import { DismissButton } from "../inputs/dismiss-button";

export const NoGroupsPlaceholder: React.FC = () => {
  const { translate } = useI18N();

  return (
    <View className="flex flex-col items-center mx-4 mt-32">
      <MaterialIcons name="emoji-people" color="black" size={64} />

      <Text className="mt-5" variant="titleMedium">
        {translate("home.prayerRequests.noPrayerGroupsJoined")}
      </Text>

      <DismissButton className="mt-5" mode="contained">
        {translate("prayerGroup.search.placeholder")}
      </DismissButton>
    </View>
  );
};
