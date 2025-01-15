import * as React from "react";
import { Text, useTheme } from "react-native-paper";

import { useI18N } from "../../hooks/use-i18n";

export const DrawerHeaderTitle: React.FC = () => {
  const { translate } = useI18N();
  const theme = useTheme();

  return (
    <Text
      variant="titleLarge"
      className="font-bold"
      style={{ color: theme.colors.primary }}
    >
      {translate("common.appName")}
    </Text>
  );
};
