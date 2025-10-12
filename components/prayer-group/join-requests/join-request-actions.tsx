import * as React from "react";
import { View } from "react-native";
import { Button } from "react-native-paper";

import { useI18N } from "../../../hooks/use-i18n";

export const JoinRequestActions: React.FC = () => {
  const { translate } = useI18N();

  return (
    <View className="flex flex-row items-center gap-x-2 flex-1">
      <View className="flex-1">
        <Button mode="text" icon={"check"}>
          {translate("common.actions.approve")}
        </Button>
      </View>
    </View>
  );
};
