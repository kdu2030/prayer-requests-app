import * as React from "react";
import { ObjectSchema } from "yup";

import { useI18N } from "../../hooks/use-i18n";
import { CreatePrayerGroupWizardStep } from "./create-prayer-group-constants";
import { CreatePrayerGroupForm } from "./create-prayer-group-types";
import { GroupImageColorStep } from "./group-image-color-step";
import { GroupNameDescriptionStep } from "./group-name-description-step";
import { groupNameValidationSchema } from "./group-name-validation-schema";
import { PrayerGroupRulesStep } from "./prayer-group-rules-step";

export const useCreatePrayerGroupWizard = () => {
  const [wizardStep, setWizardStep] =
    React.useState<CreatePrayerGroupWizardStep>(
      CreatePrayerGroupWizardStep.NameDescriptionStep
    );
  const { translate } = useI18N();

  const getWizardContent = (): React.ReactNode => {
    switch (wizardStep) {
      case CreatePrayerGroupWizardStep.NameDescriptionStep:
        return <GroupNameDescriptionStep setWizardStep={setWizardStep} />;
      case CreatePrayerGroupWizardStep.RulesStep:
        return <PrayerGroupRulesStep setWizardStep={setWizardStep} />;
      case CreatePrayerGroupWizardStep.ImageColorStep:
        return <GroupImageColorStep setWizardStep={setWizardStep} />;
    }
  };

  const getValidationSchema = ():
    | ObjectSchema<CreatePrayerGroupForm>
    | undefined => {
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
