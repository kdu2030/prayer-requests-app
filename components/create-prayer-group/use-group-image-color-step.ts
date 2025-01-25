import * as ImagePicker from "expo-image-picker";
import { setNestedObjectValues, useFormikContext } from "formik";
import { isEmpty } from "lodash";
import * as React from "react";

import { mapMediaFileFromImagePickerAsset } from "../../mappers/map-media-file";
import { CreatePrayerGroupForm } from "./create-prayer-group-types";

export const useGroupImageColorStep = () => {
  const [isColorPickerModalOpen, setIsColorPickerOpen] =
    React.useState<boolean>(false);
  const {
    values,
    setFieldValue,
    setFieldTouched,
    validateForm,
    touched,
    setTouched,
    setErrors,
  } = useFormikContext<CreatePrayerGroupForm>();

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
  };

  const savePrayerGroup = async () => {
    const errors = await validateForm();

    if (!isEmpty(errors)) {
      setErrors(errors);
      setTouched(setNestedObjectValues({ ...errors, ...touched }, true));
      return;
    }
  };

  return {
    isColorPickerModalOpen,
    setIsColorPickerOpen,
    selectImage,
    onRemoveSelectedImage,
    savePrayerGroup,
  };
};
