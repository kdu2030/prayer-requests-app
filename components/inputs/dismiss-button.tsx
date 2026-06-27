import * as React from "react";
import { Keyboard, View } from "react-native";
import { Button, ButtonProps } from "react-native-paper";

export const DismissButton = React.forwardRef(
  ({ onPress, ...props }: ButtonProps, ref: React.Ref<View>) => {
    return (
      <Button
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
