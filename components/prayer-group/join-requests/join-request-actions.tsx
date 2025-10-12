import * as React from "react";
import { View } from "react-native";
import { Button, useTheme } from "react-native-paper";

import { useI18N } from "../../../hooks/use-i18n";

export const JoinRequestActions: React.FC = () => {
  const { translate } = useI18N();
  const theme = useTheme();

  return (
    <View className="flex flex-row items-center gap-x-1 flex-1">
      <View className="flex-1">
        <Button mode="text" icon={"check"}>
          {translate("common.actions.approve")}
        </Button>
      </View>

      <View className="flex-1">
        <Button
          mode="text"
          icon={"close"}
          textColor={theme.colors.error}
          rippleColor={theme.colors.errorContainer}
        >
          {translate("common.actions.reject")}
        </Button>
      </View>
    </View>
  );
};
