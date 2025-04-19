import * as React from "react";

import { WizardHeader } from "../../../layouts/wizard-header";
import { CREATE_REQUEST_NUM_STEPS } from "../create-prayer-request-constants";

export const RequestBodyStep: React.FC = () => {
  return (
    <>
      <WizardHeader
        stepNumber={1}
        totalNumberOfSteps={CREATE_REQUEST_NUM_STEPS}
        showBackButton={false}
      />
    </>
  );
};
