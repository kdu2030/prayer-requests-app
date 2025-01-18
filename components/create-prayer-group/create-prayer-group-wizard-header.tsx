import * as React from "react";
import { View } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";

import { formatNumber } from "../../helpers/formatting-helpers";
import { useI18N } from "../../hooks/use-i18n";
import { SupportedLanguages } from "../../types/languages";

type Props = {
  stepNumber: number;
  totalNumberOfSteps: number;
  isLoading?: boolean;
  onNext?: () => void;
};

export const CreatePrayerGroupWizardHeader: React.FC<Props> = ({
  isLoading,
  onNext,
  stepNumber,
  totalNumberOfSteps,
}) => {
  const theme = useTheme();
  const { translate, i18n } = useI18N();

  return (
    <View className="flex flex-row justify-between">
      <View
        className="flex items-center justify-center px-4 rounded-full"
        style={{
          backgroundColor: theme.colors.primary,
        }}
      >
        <Text className="text-white">
          {translate("wizard.stepCount", {
            step: formatNumber(stepNumber, i18n.language as SupportedLanguages),
            total: formatNumber(
              totalNumberOfSteps,
              i18n.language as SupportedLanguages
            ),
          })}
        </Text>
      </View>

      <Button mode="outlined" onPress={onNext} loading={isLoading}>
        {translate("wizard.next")}
      </Button>
    </View>
  );
};
