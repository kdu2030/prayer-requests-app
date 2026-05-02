import * as React from "react";
import { Keyboard, TextInput } from "react-native";

export const useBlurOnHide = () => {
  const inputRef = React.useRef<TextInput>(null);

  React.useEffect(() => {
    const subscription = Keyboard.addListener("keyboardDidHide", () => {
      if (inputRef.current) {
        inputRef.current.blur();
      }
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return {
    inputRef,
  };
};
