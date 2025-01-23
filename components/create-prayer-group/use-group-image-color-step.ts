import { getInfoAsync } from "expo-file-system";
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
      const imageResult = result.assets ? result.assets[0] : undefined;
      if (!imageResult) {
        throw new Error("Unable to select image");
      }

      const imageInfo = await getInfoAsync(imageResult.uri);
      console.log(imageInfo);
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
