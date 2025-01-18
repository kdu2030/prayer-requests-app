import * as React from "react";
import { View } from "react-native";
import { Snackbar, Text } from "react-native-paper";

import { TEXT_INPUT_MAX_LENGTH } from "../../constants/input-constants";
import { useI18N } from "../../hooks/use-i18n";
import { TextInput } from "../inputs/text-input";
import {
  CreatePrayerGroupWizardStep,
  NUM_CREATE_PRAYER_GROUP_STEPS,
} from "./create-prayer-group-constants";
import { CreatePrayerGroupWizardHeader } from "./create-prayer-group-wizard-header";
import { usePrayerGroupDescriptionStep } from "./use-group-name-description-step";

type Props = {
  setWizardStep: React.Dispatch<
    React.SetStateAction<CreatePrayerGroupWizardStep>
  >;
};

export const GroupNameDescriptionStep: React.FC<Props> = ({
  setWizardStep,
}) => {
  const { translate } = useI18N();
  const { isLoading, isErrorVisible, setIsErrorVisible, onNext } =
    usePrayerGroupDescriptionStep(setWizardStep);

  return (
    <>
      <CreatePrayerGroupWizardHeader
        stepNumber={1}
        totalNumberOfSteps={NUM_CREATE_PRAYER_GROUP_STEPS}
        isLoading={isLoading}
        onNext={onNext}
      />

      <View className="mt-4">
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
          label={translate(
            "createPrayerGroup.groupNameDescription.description"
          )}
          multiline
          numberOfLines={5}
          required
        />

        <Snackbar
          className="bg-red-700"
          duration={3000}
          visible={isErrorVisible}
          onDismiss={() => {
            setIsErrorVisible(false);
          }}
          onIconPress={() => setIsErrorVisible(false)}
        >
          {translate(
            "createPrayerGroup.groupNameDescription.validateGroupFailed"
          )}
        </Snackbar>
      </View>
    </>
  );
};
