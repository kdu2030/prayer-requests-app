import * as React from "react";

import { CreatePrayerGroupWizardStep } from "./create-prayer-group-constants";
import { GroupNameDescriptionStep } from "./group-name-description-step";

export const useCreatePrayerGroupWizard = () => {
  const [wizardStep, setWizardStep] =
    React.useState<CreatePrayerGroupWizardStep>(
      CreatePrayerGroupWizardStep.NameDescriptionStep
    );

  const getWizardContent = (): React.ReactNode => {
    switch (wizardStep) {
      case CreatePrayerGroupWizardStep.NameDescriptionStep:
        return <GroupNameDescriptionStep />;
    }
  };

  return {
    wizardStep,
    setWizardStep,
    getWizardContent,
  };
};
