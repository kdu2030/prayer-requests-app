import * as React from "react";
import { Keyboard, View } from "react-native";
import { TouchableRipple, TouchableRippleProps } from "react-native-paper";

export const DismissTouchableRipple = React.forwardRef(
  (props: TouchableRippleProps, ref: React.Ref<View>) => {
    return (
      <TouchableRipple
        {...props}
        onPress={(e) => {
          props.onPress?.(e);
          Keyboard.dismiss();
        }}
        ref={ref}
      />
    );
  },
);
