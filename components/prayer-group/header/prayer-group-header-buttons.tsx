import * as React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";

type Props = {
  onPress: () => void;
  children: React.ReactNode;
};

export const PrayerGroupHeaderButtons: React.FC<Props> = ({
  onPress,
  children,
}) => {
  return (
    <TouchableOpacity
      className="rounded-full p-1 self-start"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      onPress={() => onPress}
    >
      {children}
    </TouchableOpacity>
  );
};
