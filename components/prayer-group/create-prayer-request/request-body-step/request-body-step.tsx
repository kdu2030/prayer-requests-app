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
        <TextInput
          mode="outlined"
          name="requestTitle"
          placeholder={translate("prayerGroup.request.title")}
          contentStyle={{ fontWeight: "bold", fontSize: 20 }}
          outlineStyle={{ borderColor: theme.colors.background }}
        />

        <TextInput
          mode="outlined"
          name="requestDescription"
          placeholder={translate(
            "createPrayerGroup.groupNameDescription.description"
          )}
          outlineStyle={{ borderColor: theme.colors.background }}
          multiline
        />
      </View>
    </View>
  );
};
