import * as React from "react";
import { ObjectSchema } from "yup";

import { useI18N } from "../../hooks/use-i18n";
import { CreatePrayerGroupWizardStep } from "./create-prayer-group-constants";
import { CreatePrayerGroupForm } from "./create-prayer-group-types";
import { GroupNameDescriptionStep } from "./group-name-description-step";
import { groupNameValidationSchema } from "./group-name-validation-schema";

export const useCreatePrayerGroupWizard = () => {
  const [wizardStep, setWizardStep] =
    React.useState<CreatePrayerGroupWizardStep>(
      CreatePrayerGroupWizardStep.NameDescriptionStep
    );
  const { translate } = useI18N();

  const getWizardContent = (): React.ReactNode => {
    switch (wizardStep) {
      case CreatePrayerGroupWizardStep.NameDescriptionStep:
        return <GroupNameDescriptionStep />;
    }
  };

  const getValidationSchema = (): ObjectSchema<CreatePrayerGroupForm> => {
    switch (wizardStep) {
      case CreatePrayerGroupWizardStep.NameDescriptionStep:
        return groupNameValidationSchema(translate);
    }
  };

  return {
    wizardStep,
    setWizardStep,
    getWizardContent,
    getValidationSchema,
  };
};
