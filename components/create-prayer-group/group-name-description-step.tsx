import * as React from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";

import { TEXT_INPUT_MAX_LENGTH } from "../../constants/input-constants";
import { useI18N } from "../../hooks/use-i18n";
import { TextInput } from "../inputs/text-input";

export const GroupNameDescriptionStep: React.FC = () => {
  const { translate } = useI18N();

  return (
    <View>
      <Text className="mb-5 font-bold" variant="titleLarge">
        {translate("createPrayerGroup.groupNameDescription.title")}
      </Text>

      <TextInput
        containerClassNames="mb-5"
        name="groupName"
        label={translate("createPrayerGroup.groupNameDescription.groupName")}
        maxLength={TEXT_INPUT_MAX_LENGTH}
        required
      />

      <TextInput
        name="description"
        label={translate("createPrayerGroup.groupNameDescription.description")}
        multiline
        numberOfLines={5}
        required
      />
    </View>
  );
};
