import * as ImagePicker from "expo-image-picker";
import * as React from "react";

export const useGroupImageColorStep = () => {
  const [isColorPickerModalOpen, setIsColorPickerOpen] =
    React.useState<boolean>(false);

  const selectImage = async () => {
    try {
      await ImagePicker.requestMediaLibraryPermissionsAsync();
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
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
