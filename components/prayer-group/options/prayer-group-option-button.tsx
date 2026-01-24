import * as React from "react";
import { View } from "react-native";
import {
  ActivityIndicator,
  Text,
  TouchableRipple,
  useTheme,
} from "react-native-paper";

type Props = {
  label: string;
  icon: React.ReactNode;
  endAdornment?: React.ReactNode;
  onPress: () => void;
  testID?: string;
  isLoading?: boolean;
  spinnerSize?: number;
};

export const PrayerGroupOptionButton: React.FC<Props> = ({
  label,
  icon,
  onPress,
  endAdornment,
  testID,
  isLoading,
  spinnerSize,
}) => {
  const theme = useTheme();

  return (
    <TouchableRipple
      rippleColor={"rgba(0, 0, 0, 0.12)"}
      onPress={onPress}
      style={{ borderRadius: 8 }}
      borderless
      testID={testID}
    >
      <View className="flex-row gap-x-3 items-center py-4 px-2">
        {isLoading ? (
          <ActivityIndicator
            size={spinnerSize ?? 24}
            color={theme.colors.primary}
          />
        ) : (
          icon
        )}
        <Text variant="bodyMedium">{label}</Text>
        {endAdornment}
      </View>
    </TouchableRipple>
  );
};
