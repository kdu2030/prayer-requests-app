import * as React from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";

import { useI18N } from "../../hooks/use-i18n";
import { TextInput } from "../inputs/text-input";
import { WizardHeader } from "../layouts/wizard-header";
import {
  CreatePrayerGroupWizardStep,
  NUM_CREATE_PRAYER_GROUP_STEPS,
  WIZARD_TEST_IDS_CONFIG,
} from "./create-prayer-group-constants";

type Props = {
  setWizardStep: React.Dispatch<
    React.SetStateAction<CreatePrayerGroupWizardStep>
  >;
};

export const PrayerGroupRulesStep: React.FC<Props> = ({ setWizardStep }) => {
  const { translate } = useI18N();
  return (
    <>
      <WizardHeader
        stepNumber={2}
        totalNumberOfSteps={NUM_CREATE_PRAYER_GROUP_STEPS}
        onBack={() =>
          setWizardStep(CreatePrayerGroupWizardStep.NameDescriptionStep)
        }
        onNext={() => {
          setWizardStep(CreatePrayerGroupWizardStep.ImageStep);
        }}
        testIDs={WIZARD_TEST_IDS_CONFIG}
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
