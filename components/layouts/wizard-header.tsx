import { Ionicons } from "@expo/vector-icons";
import * as React from "react";
import { View } from "react-native";
import { Text, useTheme } from "react-native-paper";

import { formatNumber } from "../../helpers/formatting-helpers";
import { useI18N } from "../../hooks/use-i18n";
import { CultureCode } from "../../types/languages";
import { DismissButton } from "../inputs/dismiss-button";
import { DismissTouchableOpacity } from "../inputs/dismiss-touchable-opacity";

export type WizardHeaderTestIDs = {
  backButton?: string;
  nextButton?: string;
  saveButton?: string;
};

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
  testIDs?: WizardHeaderTestIDs;
};

export const WizardHeader: React.FC<Props> = ({
  isLoading,
  onNext,
  onBack,
  onSave,
  stepNumber,
  totalNumberOfSteps,
  showBackButton = true,
  showNextButton = true,
  showSaveButton = false,
  testIDs,
}) => {
  const theme = useTheme();
  const { translate, i18n } = useI18N();

  return (
    <View className="flex flex-row items-center justify-between">
      <View className="flex flex-row items-center">
        {showBackButton && (
          <DismissTouchableOpacity
            className="mr-3"
            onPress={onBack}
            testID={testIDs?.backButton}
          >
            <Ionicons
              name="arrow-back"
              size={28}
              color={theme.colors.onSurface}
            />
          </DismissTouchableOpacity>
        )}
        <View
          className="flex items-center justify-center p-2 rounded-full"
          style={{
            backgroundColor: theme.colors.primary,
          }}
        >
          <Text className="text-white">
            {translate("wizard.stepCount", {
              step: formatNumber(stepNumber, i18n.language as CultureCode),
              total: formatNumber(
                totalNumberOfSteps,
                i18n.language as CultureCode,
              ),
            })}
          </Text>
        </View>
      </View>

      {showNextButton && (
        <DismissButton
          mode="outlined"
          onPress={() => {
            onNext?.();
          }}
          loading={isLoading}
          testID={testIDs?.nextButton}
        >
          {translate("wizard.next")}
        </DismissButton>
      )}

      {showSaveButton && (
        <DismissButton
          mode="contained"
          onPress={onSave}
          loading={isLoading}
          testID={testIDs?.saveButton}
        >
          {translate("common.actions.save")}
        </DismissButton>
      )}
    </View>
  );
};
