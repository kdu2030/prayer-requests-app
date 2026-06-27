import * as React from "react";
import {
  Keyboard,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native";

export const DismissTouchableOpacity = React.forwardRef(
  ({ onPress, ...props }: TouchableOpacityProps, ref: React.Ref<View>) => {
    return (
      <TouchableOpacity
        {...props}
        onPress={(e) => {
          onPress?.(e);
          Keyboard.dismiss();
        }}
        ref={ref}
      />
    );
  },
);
