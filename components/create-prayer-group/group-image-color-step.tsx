import * as React from "react";

import {
  CreatePrayerGroupWizardStep,
  NUM_CREATE_PRAYER_GROUP_STEPS,
} from "./create-prayer-group-constants";
import { CreatePrayerGroupWizardHeader } from "./create-prayer-group-wizard-header";

type Props = {
  setWizardStep: React.Dispatch<
    React.SetStateAction<CreatePrayerGroupWizardStep>
  >;
};

export const GroupImageColorStep: React.FC<Props> = ({ setWizardStep }) => {
  return (
    <>
      <CreatePrayerGroupWizardHeader
        stepNumber={3}
        totalNumberOfSteps={NUM_CREATE_PRAYER_GROUP_STEPS}
        onBack={() => setWizardStep(CreatePrayerGroupWizardStep.RulesStep)}
      />
    </>
  );
};
