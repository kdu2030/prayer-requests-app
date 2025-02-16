import * as React from "react";
import { ObjectSchema } from "yup";

import { useI18N } from "../../hooks/use-i18n";
import { SupportedLanguages } from "../../types/languages";
import { CreatePrayerGroupWizardStep } from "./create-prayer-group-constants";
import { CreatePrayerGroupForm } from "./create-prayer-group-types";
import { GroupImageStep } from "./group-image-step/group-image-color-step";
import { groupImageColorValidationSchema } from "./group-image-step/group-image-color-validation-schema";
import { GroupNameDescriptionStep } from "./group-name-description-step";
import { groupNameValidationSchema } from "./group-name-validation-schema";
import { PrayerGroupRulesStep } from "./prayer-group-rules-step";

export const useCreatePrayerGroupWizard = () => {
  const [wizardStep, setWizardStep] =
    React.useState<CreatePrayerGroupWizardStep>(
      CreatePrayerGroupWizardStep.NameDescriptionStep
    );
  const { translate, i18n } = useI18N();

  const getWizardContent = (): React.ReactNode => {
    switch (wizardStep) {
      case CreatePrayerGroupWizardStep.NameDescriptionStep:
        return <GroupNameDescriptionStep setWizardStep={setWizardStep} />;
      case CreatePrayerGroupWizardStep.RulesStep:
        return <PrayerGroupRulesStep setWizardStep={setWizardStep} />;
      case CreatePrayerGroupWizardStep.ImageStep:
        return <GroupImageStep setWizardStep={setWizardStep} />;
    }
  };

  const getValidationSchema = ():
    | ObjectSchema<CreatePrayerGroupForm>
    | undefined => {
    switch (wizardStep) {
      case CreatePrayerGroupWizardStep.NameDescriptionStep:
        return groupNameValidationSchema(translate);
      case CreatePrayerGroupWizardStep.ImageStep:
        return groupImageColorValidationSchema(
          translate,
          i18n.language as SupportedLanguages
        );
    }
  };

  return {
    wizardStep,
    setWizardStep,
    getWizardContent,
    getValidationSchema,
  };
};
