import { MaterialIcons } from "@expo/vector-icons";
import * as React from "react";
import { View } from "react-native";
import { Portal, Snackbar, Text, useTheme } from "react-native-paper";

export type ToasterMessage = {
  message: string;
  variant: "success" | "error";
};

type Props = {
  toasterMessage: ToasterMessage | undefined;
  setToasterMessage: React.Dispatch<
    React.SetStateAction<ToasterMessage | undefined>
  >;
};

export const ToasterSnackbar: React.FC<Props> = ({
  toasterMessage,
  setToasterMessage,
}) => {
  const theme = useTheme();
  const [isVisible, setIsVisible] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (toasterMessage) {
      setIsVisible(true);
    }
  }, [toasterMessage]);

  const onDismiss = () => {
    setIsVisible(false);
    setTimeout(() => setToasterMessage(undefined), 2000);
  };

  return (
    <Portal>
      <Snackbar
        style={{
          backgroundColor:
            toasterMessage?.variant === "success"
              ? theme.colors.primary
              : theme.colors.error,
        }}
        duration={3000}
        visible={isVisible}
        onDismiss={onDismiss}
        onIconPress={onDismiss}
      >
        <View className="flex flex-row items-center">
          {toasterMessage?.variant === "success" ? (
            <MaterialIcons size={24} name="check" color={"white"} />
          ) : (
            <MaterialIcons size={24} name="warning" color={"white"} />
          )}
          <Text className="ml-2 text-white">{toasterMessage?.message}</Text>
        </View>
      </Snackbar>
    </Portal>
  );
};
