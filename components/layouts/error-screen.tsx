import { MaterialIcons } from "@expo/vector-icons";
import classNames from "classnames";
import * as React from "react";
import { View } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useI18N } from "../../hooks/use-i18n";

type Props = {
  errorLabel: string;
  className?: string;
  onRetry: () => void;
  showSafeArea?: boolean;
  fillContainer?: boolean;
};

export const ErrorScreen: React.FC<Props> = ({
  errorLabel,
  onRetry,
  showSafeArea = true,
  className,
  fillContainer = true,
}) => {
  const theme = useTheme();
  const { left, right, bottom } = useSafeAreaInsets();

  const { translate } = useI18N();

  const safeAreaStyles = showSafeArea
    ? { paddingLeft: left, paddingRight: right, paddingBottom: bottom }
    : undefined;

  return (
    <>
      <View
        className={classNames(
          "flex items-center justify-center",
          fillContainer && "flex-1",
          className
        )}
        style={{
          backgroundColor: theme.colors.background,
          ...safeAreaStyles,
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
