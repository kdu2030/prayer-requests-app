import * as React from "react";
import { View } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";

import { useI18N } from "../../hooks/use-i18n";

type Props = {
  isLoading?: boolean;
  onNext?: () => void;
};

export const CreatePrayerGroupWizardHeader: React.FC<Props> = ({
  isLoading,
  onNext,
}) => {
  const theme = useTheme();
  const { translate } = useI18N();

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
            step: "1",
            total: "2",
          })}
        </Text>
      </View>

      <Button mode="outlined" onPress={onNext} loading={isLoading}>
        {translate("wizard.next")}
      </Button>
    </View>
  );
};
