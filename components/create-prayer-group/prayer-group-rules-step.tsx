import * as React from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";

import { useI18N } from "../../hooks/use-i18n";
import { TextInput } from "../inputs/text-input";
import {
  CreatePrayerGroupWizardStep,
  NUM_CREATE_PRAYER_GROUP_STEPS,
} from "./create-prayer-group-constants";
import { CreatePrayerGroupWizardHeader } from "./create-prayer-group-wizard-header";

type Props = {
  setWizardStep: React.Dispatch<
    React.SetStateAction<CreatePrayerGroupWizardStep>
  >;
};

export const PrayerGroupRulesStep: React.FC<Props> = ({ setWizardStep }) => {
  const { translate } = useI18N();
  return (
    <>
      <CreatePrayerGroupWizardHeader
        stepNumber={2}
        totalNumberOfSteps={NUM_CREATE_PRAYER_GROUP_STEPS}
        onBack={() =>
          setWizardStep(CreatePrayerGroupWizardStep.NameDescriptionStep)
        }
      />

      <View className="mt-4">
        <Text className="mb-2 font-bold" variant="titleLarge">
          {translate("createPrayerGroup.rules.title")}
        </Text>

        <Text variant="bodyLarge" className="mb-5">
          {translate("createPrayerGroup.rules.stepDescription")}
        </Text>

        <TextInput
          name="rules"
          label={translate("createPrayerGroup.rules.label")}
          numberOfLines={5}
          multiline
        />
      </View>
    </>
  );
};
