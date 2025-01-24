import { getInfoAsync } from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import { useFormikContext } from "formik";
import * as React from "react";

import { mapMediaFileFromImagePickerAsset } from "../../mappers/map-media-file";
import { CreatePrayerGroupForm } from "./create-prayer-group-types";

export const useGroupImageColorStep = () => {
  const [isColorPickerModalOpen, setIsColorPickerOpen] =
    React.useState<boolean>(false);
  const { values, setFieldValue } = useFormikContext<CreatePrayerGroupForm>();

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
        return;
      }

      setFieldValue("image", mapMediaFileFromImagePickerAsset(imageResult));

      // TODO: Move this to validation schema?
      const imageInfo = await getInfoAsync(imageResult.uri);
      console.log(imageInfo);
    } catch (error) {
      return;
    }
  };

  const onRemoveSelectedImage = () => {
    if (!values.image) {
      return;
    }
    setFieldValue("image", undefined);
  };

  return {
    isColorPickerModalOpen,
    setIsColorPickerOpen,
    selectImage,
    onRemoveSelectedImage,
  };
};
