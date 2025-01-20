import {
  launchImageLibraryAsync,
  requestMediaLibraryPermissionsAsync,
} from "expo-image-picker";
import * as React from "react";

export const useGroupImageColorStep = () => {
  const [isColorPickerModalOpen, setIsColorPickerOpen] =
    React.useState<boolean>(false);

  const selectImage = async () => {
    try {
      await requestMediaLibraryPermissionsAsync();
      const result = await launchImageLibraryAsync({
        mediaTypes: ["images"],
        aspect: [1, 1],
        quality: 1,
        allowsEditing: true,
      });
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    isColorPickerModalOpen,
    setIsColorPickerOpen,
    selectImage,
  };
};
