import * as React from "react";
import { Keyboard, View } from "react-native";
import { TouchableRipple, TouchableRippleProps } from "react-native-paper";

export const DismissTouchableRipple = React.forwardRef(
  ({ onPress, ...props }: TouchableRippleProps, ref: React.Ref<View>) => {
    return (
      <TouchableRipple
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
