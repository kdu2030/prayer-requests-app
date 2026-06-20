import * as React from "react";
import {
  Keyboard,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native";

export const DismissTouchableOpacity = React.forwardRef(
  (props: TouchableOpacityProps, ref: React.Ref<View>) => {
    return (
      <TouchableOpacity
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
