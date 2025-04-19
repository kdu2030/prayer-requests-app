import * as React from "react";

import { CreatePrayerRequestWizardStep } from "./create-prayer-request-types";
import { RequestBodyStep } from "./request-body-step/request-body-step";

type WizardStepToContent = {
  [key in CreatePrayerRequestWizardStep]?: React.ReactNode;
};

export const useCreatePrayerRequestWizard = () => {
  const [wizardStep, setWizardStep] =
    React.useState<CreatePrayerRequestWizardStep>(
      CreatePrayerRequestWizardStep.RequestBodyStep
    );

  const getPrayerRequestWizardContent = () => {
    const wizardStepToContent: WizardStepToContent = {
      [CreatePrayerRequestWizardStep.RequestBodyStep]: <RequestBodyStep />,
    };

    return wizardStepToContent[wizardStep];
  };

  return {
    wizardStep,
    setWizardStep,
    getPrayerRequestWizardContent,
  };
};
