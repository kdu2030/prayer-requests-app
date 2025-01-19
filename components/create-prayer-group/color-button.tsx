import { FontAwesome } from "@expo/vector-icons";
import * as React from "react";
import { Pressable } from "react-native";

type Props = {
  color: string;
  isChecked: boolean;
  onPress: () => void;
};

export const ColorButton: React.FC<Props> = ({ color, isChecked, onPress }) => {
  return (
    <Pressable onPress={onPress}>
      <FontAwesome
        name={isChecked ? "check-circle" : "circle"}
        size={48}
        color={color}
      />
    </Pressable>
  );
};
