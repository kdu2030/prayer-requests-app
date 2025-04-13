import * as React from "react";
import { View } from "react-native";
import { Text, TouchableRipple } from "react-native-paper";

type Props = {
  label: string;
  icon: React.ReactNode;
  onPress: () => void;
  testID?: string;
};

export const PrayerGroupOptionButton: React.FC<Props> = ({
  label,
  icon,
  onPress,
  testID,
}) => {
  return (
    <TouchableRipple
      rippleColor={"rgba(0, 0, 0, 0.12)"}
      onPress={onPress}
      style={{ borderRadius: 8 }}
      borderless
      testID={testID}
    >
      <View className="flex-row gap-x-3 items-center py-4 px-2">
        {icon}
        <Text variant="bodyMedium">{label}</Text>
      </View>
    </TouchableRipple>
  );
};
