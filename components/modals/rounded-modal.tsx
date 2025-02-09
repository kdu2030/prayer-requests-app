import { Ionicons } from "@expo/vector-icons";
import * as React from "react";
import { TouchableOpacity, View } from "react-native";
import { Modal, Portal, Text, useTheme } from "react-native-paper";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
};

export const RoundedModal: React.FC<Props> = ({
  isOpen,
  onClose,
  title,
  children,
}) => {
  const theme = useTheme();

  return (
    <Portal>
      <Modal
        visible={isOpen}
        onDismiss={onClose}
        style={{ padding: 8 }}
        contentContainerStyle={{
          backgroundColor: theme.colors.background,
          padding: 20,
          borderRadius: 8,
        }}
      >
        <View
          className="flex flex-row justify-between items-center border-gray-600 pb-4 mb-6"
          style={{ borderBottomWidth: 0.5 }}
        >
          <Text variant="titleLarge" className="font-bold">
            {title}
          </Text>

          <TouchableOpacity onPress={onClose}>
            <Ionicons name="close" size={28} />
          </TouchableOpacity>
        </View>
        {children}
      </Modal>
    </Portal>
  );
};
