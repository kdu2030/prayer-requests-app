import { MaterialIcons } from "@expo/vector-icons";
import * as React from "react";
import { View } from "react-native";
import { Portal, Snackbar, Text, useTheme } from "react-native-paper";

type Props = {
  snackbarError: string | undefined;
  setSnackbarError: React.Dispatch<React.SetStateAction<string | undefined>>;
};

export const ErrorSnackbar: React.FC<Props> = ({
  snackbarError,
  setSnackbarError,
}) => {
  const theme = useTheme();

  return (
    <Portal>
      <Snackbar
        style={{ backgroundColor: theme.colors.error }}
        duration={3000}
        visible={!!snackbarError}
        onDismiss={() => {
          setSnackbarError(undefined);
        }}
        onIconPress={() => setSnackbarError(undefined)}
      >
        <View className="flex flex-row items-center">
          <MaterialIcons size={24} name="warning" color={"white"} />
          <Text className="ml-2 text-white">{snackbarError}</Text>
        </View>
      </Snackbar>
    </Portal>
  );
};
