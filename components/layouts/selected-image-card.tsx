import { EvilIcons } from "@expo/vector-icons";
import * as React from "react";
import { TouchableOpacity, View } from "react-native";
import { Text, useTheme } from "react-native-paper";

type Props = {
  fileName: string;
  onRemoveImage: () => void;
};

export const SelectedImageCard: React.FC<Props> = ({
  fileName,
  onRemoveImage,
}) => {
  const theme = useTheme();

  return (
    <View className="rounded-lg border border-gray-400 p-4 mt-4">
      <View className="flex flex-row items-center justify-between">
        <Text numberOfLines={1} ellipsizeMode="tail">
          {fileName}
        </Text>
        <TouchableOpacity onPress={onRemoveImage}>
          <EvilIcons name="trash" size={28} color={theme.colors.error} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
