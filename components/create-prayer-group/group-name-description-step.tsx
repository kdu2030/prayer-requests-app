import * as React from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";

import { TEXT_INPUT_MAX_LENGTH } from "../../constants/input-constants";
import { useI18N } from "../../hooks/use-i18n";
import { TextInput } from "../inputs/text-input";
import { ErrorSnackbar } from "../layouts/error-snackbar";
import { WizardHeader } from "../layouts/wizard-header";
import {
  CreatePrayerGroupWizardStep,
  NUM_CREATE_PRAYER_GROUP_STEPS,
  WIZARD_TEST_IDS_CONFIG,
} from "./create-prayer-group-constants";
import { GroupNameDescriptionStepTestIds } from "./tests/test-ids";
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
  const { isLoading, snackbarError, setSnackbarError, onNext } =
    usePrayerGroupDescriptionStep(setWizardStep);

  return (
    <>
      <WizardHeader
        stepNumber={1}
        totalNumberOfSteps={NUM_CREATE_PRAYER_GROUP_STEPS}
        isLoading={isLoading}
        onNext={onNext}
        showBackButton={false}
        testIDs={WIZARD_TEST_IDS_CONFIG}
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
          testID={GroupNameDescriptionStepTestIds.groupNameInput}
        />

        <TextInput
          name="description"
          label={translate(
            "createPrayerGroup.groupNameDescription.description"
          )}
          multiline
          numberOfLines={5}
          required
          testID={GroupNameDescriptionStepTestIds.descriptionInput}
        />

        <ErrorSnackbar
          snackbarError={snackbarError}
          setSnackbarError={setSnackbarError}
        />
      </View>
    </>
  );
};
