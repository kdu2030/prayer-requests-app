import { MaterialIcons } from "@expo/vector-icons";
import * as React from "react";
import { View } from "react-native";
import { Portal, Snackbar, Text, useTheme } from "react-native-paper";

type Props = {
  successMessage: string | undefined;
  setSuccessMessage: React.Dispatch<React.SetStateAction<string | undefined>>;
};

export const SuccessSnackbar: React.FC<Props> = ({
  successMessage,
  setSuccessMessage,
}) => {
  const theme = useTheme();

  return (
    <Portal>
      <Snackbar
        style={{ backgroundColor: theme.colors.primary }}
        duration={3000}
        visible={!!successMessage}
        onDismiss={() => {
          setSuccessMessage(undefined);
        }}
        onIconPress={() => setSuccessMessage(undefined)}
      >
        <View className="flex flex-row items-center">
          <MaterialIcons size={24} name="check" color={"white"} />
          <Text className="ml-2 text-white">{successMessage}</Text>
        </View>
      </Snackbar>
    </Portal>
  );
};
