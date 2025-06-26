import classNames from "classnames";
import * as React from "react";
import { View } from "react-native";
import { ActivityIndicator, Text, useTheme } from "react-native-paper";
import { VariantProp } from "react-native-paper/lib/typescript/components/Typography/types";

import { useI18N } from "../../../hooks/use-i18n";

type Props = {
  className?: string;
  labelVariant: VariantProp<string>;
  textClassName?: string;
  size?: number;
};

export const PrayerRequestSpinner: React.FC<Props> = ({
  className,
  labelVariant,
  size = 64,
  textClassName,
}) => {
  const { translate } = useI18N();
  const theme = useTheme();

  return (
    <View className={classNames("flex items-center", className)}>
      <ActivityIndicator
        animating={true}
        size={size}
        color={theme.colors.primary}
      />
      <Text variant={labelVariant} className={textClassName}>
        {translate("prayerRequest.loading")}
      </Text>
    </View>
  );
};
