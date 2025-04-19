import { useNavigation } from "expo-router";
import { FormikProps } from "formik";
import * as React from "react";
import * as Yup from "yup";

import {
  CreatePrayerRequestForm,
  CreatePrayerRequestWizardStep,
} from "./create-prayer-request-types";
import { RequestBodyStep } from "./request-body-step/request-body-step";
import { useRequestBodyValidationSchema } from "./request-body-step/use-request-body-validation-schema";

type WizardStepToContent = {
  [key in CreatePrayerRequestWizardStep]?: React.ReactNode;
};

type WizardStepToValidationSchema = {
  [key in CreatePrayerRequestWizardStep]?: Yup.ObjectSchema<CreatePrayerRequestForm>;
};

export const useCreatePrayerRequestWizard = () => {
  const [wizardStep, setWizardStep] =
    React.useState<CreatePrayerRequestWizardStep>(
      CreatePrayerRequestWizardStep.RequestBodyStep
    );

  const requestBodyValidationSchema = useRequestBodyValidationSchema();
  const navigation = useNavigation();

  const formikRef = React.useRef<FormikProps<CreatePrayerRequestForm>>(null);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener("blur", () => {
      formikRef.current?.resetForm();
    });

    return unsubscribe;
  }, [navigation]);

  const getPrayerRequestWizardContent = () => {
    const wizardStepToContent: WizardStepToContent = {
      [CreatePrayerRequestWizardStep.RequestBodyStep]: (
        <RequestBodyStep setWizardStep={setWizardStep} />
      ),
    };

    return wizardStepToContent[wizardStep];
  };

  const getPrayerRequestValidationSchema = () => {
    const wizardStepToValidationSchema: WizardStepToValidationSchema = {
      [CreatePrayerRequestWizardStep.RequestBodyStep]:
        requestBodyValidationSchema,
    };

    return wizardStepToValidationSchema[wizardStep];
  };

  return {
    wizardStep,
    setWizardStep,
    getPrayerRequestWizardContent,
    getPrayerRequestValidationSchema,
    formikRef,
  };
};
