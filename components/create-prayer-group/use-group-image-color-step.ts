import * as ImagePicker from "expo-image-picker";
import { useFormikContext } from "formik";
import * as React from "react";

import { mapMediaFileFromImagePickerAsset } from "../../mappers/map-media-file";
import { CreatePrayerGroupForm } from "./create-prayer-group-types";

export const useGroupImageColorStep = () => {
  const [isColorPickerModalOpen, setIsColorPickerOpen] =
    React.useState<boolean>(false);
  const { values, setFieldValue, setFieldTouched, errors } =
    useFormikContext<CreatePrayerGroupForm>();

  React.useEffect(() => {
    console.log(errors);
  }, [errors]);

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
      setFieldTouched("image", true);
    } catch (error) {
      return;
    }
  };

  const onRemoveSelectedImage = () => {
    if (!values.image) {
      return;
    }
    setFieldValue("image", undefined);
    setFieldTouched("image", true);
  };

  return {
    isColorPickerModalOpen,
    setIsColorPickerOpen,
    selectImage,
    onRemoveSelectedImage,
  };
};
