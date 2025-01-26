import { Ionicons } from "@expo/vector-icons";
import * as React from "react";
import { TouchableOpacity, View } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";

import { formatNumber } from "../../helpers/formatting-helpers";
import { useI18N } from "../../hooks/use-i18n";
import { SupportedLanguages } from "../../types/languages";
import { CreatePrayerGroupWizardHeaderTestIds } from "./tests/test-ids";

type Props = {
  stepNumber: number;
  totalNumberOfSteps: number;
  isLoading?: boolean;
  onNext?: () => void;
  onBack?: () => void;
  onSave?: () => void;
  showBackButton?: boolean;
  showNextButton?: boolean;
  showSaveButton?: boolean;
};

export const CreatePrayerGroupWizardHeader: React.FC<Props> = ({
  isLoading,
  onNext,
  onBack,
  onSave,
  stepNumber,
  totalNumberOfSteps,
  showBackButton = true,
  showNextButton = true,
  showSaveButton = false,
}) => {
  const theme = useTheme();
  const { translate, i18n } = useI18N();

  return (
    <View className="flex flex-row items-center justify-between">
      <View className="flex flex-row items-center">
        {showBackButton && (
          <TouchableOpacity
            className="mr-3"
            onPress={onBack}
            testID={CreatePrayerGroupWizardHeaderTestIds.backButton}
          >
            <Ionicons name="arrow-back" size={24} />
          </TouchableOpacity>
        )}
        <View
          className="flex items-center justify-center p-2 rounded-full"
          style={{
            backgroundColor: theme.colors.primary,
          }}
        >
          <Text className="text-white">
            {translate("wizard.stepCount", {
              step: formatNumber(
                stepNumber,
                i18n.language as SupportedLanguages
              ),
              total: formatNumber(
                totalNumberOfSteps,
                i18n.language as SupportedLanguages
              ),
            })}
          </Text>
        </View>
      </View>

      {showNextButton && (
        <Button
          mode="outlined"
          onPress={onNext}
          loading={isLoading}
          testID={CreatePrayerGroupWizardHeaderTestIds.nextButton}
        >
          {translate("wizard.next")}
        </Button>
      )}

      {showSaveButton && (
        <Button
          mode="contained"
          onPress={onSave}
          loading={isLoading}
          testID={CreatePrayerGroupWizardHeaderTestIds.saveButton}
        >
          {translate("common.actions.save")}
        </Button>
      )}
    </View>
  );
};
