import * as React from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";

import { useI18N } from "../../../../hooks/use-i18n";
// import { FormikSelect } from "../../../inputs/formik-select";
// import { ErrorSnackbar } from "../../../layouts/error-snackbar";
import { WizardHeader } from "../../../layouts/wizard-header";
import { CREATE_REQUEST_NUM_STEPS } from "../create-prayer-request-constants";
import { CreatePrayerRequestWizardStep } from "../create-prayer-request-types";
import { ExpirationStepTestIds } from "./tests/test-ids";
import { useExpirationStep } from "./use-expiration-step";

type Props = {
  setWizardStep: React.Dispatch<
    React.SetStateAction<CreatePrayerRequestWizardStep>
  >;
};

export const ExpirationStep: React.FC<Props> = ({ setWizardStep }) => {
  const { translate } = useI18N();
  const {
    expirationDateOptions,
    onSavePrayerRequest,
    isLoading,
    snackbarError,
    setSnackbarError,
  } = useExpirationStep();

  return (
    <View>
      <WizardHeader
        stepNumber={2}
        totalNumberOfSteps={CREATE_REQUEST_NUM_STEPS}
        showNextButton={false}
        showSaveButton
        onBack={() =>
          setWizardStep(CreatePrayerRequestWizardStep.RequestBodyStep)
        }
        onSave={onSavePrayerRequest}
        isLoading={isLoading}
        testIDs={{ saveButton: ExpirationStepTestIds.saveButton }}
      />

      <View className="mt-4">
        <Text className="font-bold mb-2" variant="titleLarge">
          {translate("prayerGroup.request.expirationDate.header")}
        </Text>

        <Text variant="bodyLarge">
          {translate("prayerGroup.request.expirationDate.description")}
        </Text>

        {/* <FormikSelect
          containerClassName="mt-5"
          mode="flat"
          label={translate("prayerGroup.request.visibilityDuration.label")}
          name="timeToLive"
          options={expirationDateOptions}
          required
        /> */}
      </View>

      {/* <ErrorSnackbar
        snackbarError={snackbarError}
        setSnackbarError={setSnackbarError}
      /> */}
    </View>
  );
};
