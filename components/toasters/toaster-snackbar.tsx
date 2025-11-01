import { MaterialIcons } from "@expo/vector-icons";
import * as React from "react";
import { View } from "react-native";
import { Snackbar, Text, useTheme } from "react-native-paper";

import { useToasterContext } from "./toaster-context";
import { ToasterConfig } from "./toaster-type";

type Props = {
  toaster: ToasterConfig;
};

export const ToasterSnackbar: React.FC<Props> = ({ toaster }) => {
  const theme = useTheme();
  const [isVisible, setIsVisible] = React.useState<boolean>(true);
  const { removeToaster } = useToasterContext();

  const onDismissToaster = () => {
    setIsVisible(false);
    setTimeout(() => removeToaster(toaster.toasterId), 3000);
  };

  return (
    <Snackbar
      style={{
        backgroundColor:
          toaster.variant === "success"
            ? theme.colors.primary
            : theme.colors.error,
      }}
      duration={3000}
      visible={isVisible}
      onDismiss={onDismissToaster}
      onIconPress={onDismissToaster}
    >
      <View className="flex flex-row items-center">
        <MaterialIcons
          size={24}
          name={toaster.variant === "success" ? "check" : "warning"}
          color={"white"}
        />
        <Text className="ml-2 text-white">{toaster.message}</Text>
      </View>
    </Snackbar>
  );
};
