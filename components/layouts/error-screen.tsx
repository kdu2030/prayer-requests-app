import { MaterialIcons } from "@expo/vector-icons";
import * as React from "react";
import { View } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useI18N } from "../../hooks/use-i18n";

type Props = {
  errorLabel: string;
  onRetry: () => void;
};

export const ErrorScreen: React.FC<Props> = ({ errorLabel, onRetry }) => {
  const theme = useTheme();
  const { left, right, bottom } = useSafeAreaInsets();

  const { translate } = useI18N();

  return (
    <>
      <View
        className="flex items-center justify-center flex-1"
        style={{
          backgroundColor: theme.colors.background,
          paddingLeft: left,
          paddingRight: right,
          paddingBottom: bottom,
        }}
      >
        <MaterialIcons name="warning" size={70} color={theme.colors.error} />
        <Text className="mt-5" variant="titleMedium">
          {errorLabel}
        </Text>

        <Button mode="contained" className="mt-5" onPress={onRetry}>
          {translate("common.actions.retry")}
        </Button>
      </View>
    </>
  );
};
