import * as React from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";

import { useI18N } from "../../hooks/use-i18n";
import { NUM_CREATE_PRAYER_GROUP_STEPS } from "./create-prayer-group-constants";
import { CreatePrayerGroupWizardHeader } from "./create-prayer-group-wizard-header";

export const PrayerGroupRulesStep: React.FC = () => {
  const { translate } = useI18N();
  return (
    <>
      <CreatePrayerGroupWizardHeader
        stepNumber={2}
        totalNumberOfSteps={NUM_CREATE_PRAYER_GROUP_STEPS}
      />

      <View className="mt-4">
        <Text className="mb-5 font-bold" variant="titleLarge">
          {translate("createPrayerGroup.rules.title")}
        </Text>
      </View>
    </>
  );
};
