import * as React from "react";

import { NUM_CREATE_PRAYER_GROUP_STEPS } from "./create-prayer-group-constants";
import { CreatePrayerGroupWizardHeader } from "./create-prayer-group-wizard-header";

export const PrayerGroupRulesStep: React.FC = () => {
  return (
    <>
      <CreatePrayerGroupWizardHeader
        stepNumber={2}
        totalNumberOfSteps={NUM_CREATE_PRAYER_GROUP_STEPS}
      />
    </>
  );
};
