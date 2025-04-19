import * as React from "react";
import { View } from "react-native";
import { useTheme } from "react-native-paper";

import { useI18N } from "../../../../hooks/use-i18n";
import { TextInput } from "../../../inputs/text-input";
import { WizardHeader } from "../../../layouts/wizard-header";
import { CREATE_REQUEST_NUM_STEPS } from "../create-prayer-request-constants";

export const RequestBodyStep: React.FC = () => {
  const theme = useTheme();
  const { translate } = useI18N();

  return (
    <View>
      <WizardHeader
        stepNumber={1}
        totalNumberOfSteps={CREATE_REQUEST_NUM_STEPS}
        showBackButton={false}
      />

      <View className="flex flex-col mt-5">
        {/**TODO: Replace with raw text input from react-native? */}

        <TextInput
          outlineColor={theme.colors.background}
          mode="outlined"
          name="requestTitle"
          placeholder={translate("prayerGroup.request.title")}
          selectionColor={theme.colors.primary}
        />
      </View>
    </View>
  );
};
