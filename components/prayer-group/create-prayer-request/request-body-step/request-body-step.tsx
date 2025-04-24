import * as React from "react";
import { View } from "react-native";
import { useTheme } from "react-native-paper";

import { useI18N } from "../../../../hooks/use-i18n";
import { TextInput } from "../../../inputs/text-input";
import { WizardHeader } from "../../../layouts/wizard-header";
import { CREATE_REQUEST_NUM_STEPS } from "../create-prayer-request-constants";
import { CreatePrayerRequestWizardStep } from "../create-prayer-request-types";
import { RequestBodyTestIds } from "./tests/test-id";
import { useRequestBodyStep } from "./use-request-body-step";

type Props = {
  setWizardStep: React.Dispatch<
    React.SetStateAction<CreatePrayerRequestWizardStep>
  >;
};

export const RequestBodyStep: React.FC<Props> = ({ setWizardStep }) => {
  const theme = useTheme();
  const { translate } = useI18N();

  const { onNext } = useRequestBodyStep(setWizardStep);

  return (
    <View>
      <WizardHeader
        stepNumber={1}
        totalNumberOfSteps={CREATE_REQUEST_NUM_STEPS}
        showBackButton={false}
        onNext={onNext}
        testIDs={{ nextButton: RequestBodyTestIds.nextButton }}
      />

      <View className="flex flex-col mt-5">
        <TextInput
          mode="outlined"
          name="requestTitle"
          placeholder={translate("prayerGroup.request.title")}
          contentStyle={{ fontWeight: "bold", fontSize: 20 }}
          outlineStyle={{ borderColor: theme.colors.background }}
          errorClassNames="mb-3"
        />

        <TextInput
          mode="outlined"
          name="requestDescription"
          placeholder={translate(
            "createPrayerGroup.groupNameDescription.description"
          )}
          outlineStyle={{ borderColor: theme.colors.background }}
          multiline
          contentStyle={{ paddingTop: 16 }}
          numberOfLines={5}
        />
      </View>
    </View>
  );
};
