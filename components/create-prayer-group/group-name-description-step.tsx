import * as React from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";

import { useI18N } from "../../hooks/use-i18n";

export const GroupNameDescriptionStep: React.FC = () => {
  const { translate } = useI18N();

  return (
    <View>
      <Text className="font-bold" variant="titleLarge">
        {translate("createPrayerGroup.groupNameDescription.title")}
      </Text>
    </View>
  );
};
