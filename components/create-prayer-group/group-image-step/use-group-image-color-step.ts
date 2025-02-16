import * as ImagePicker from "expo-image-picker";
import { setNestedObjectValues, useFormikContext } from "formik";
import { isEmpty } from "lodash";
import * as React from "react";

import { usePostFile } from "../../../api/post-file";
import { usePostPrayerGroup } from "../../../api/post-prayer-group";
import { useI18N } from "../../../hooks/use-i18n";
import {
  mapFileToUpload,
  mapMediaFileFromImagePickerAsset,
} from "../../../mappers/map-media-file";
import { mapCreatePrayerGroupRequest } from "../../../mappers/map-prayer-group";
import { ManagedErrorResponse } from "../../../types/error-handling";
import { RawMediaFile } from "../../../types/media-file-types";
import { CreatePrayerGroupForm } from "../create-prayer-group-types";

export const useGroupImageColorStep = () => {
  const { translate } = useI18N();

  const [isColorPickerModalOpen, setIsColorPickerOpen] =
    React.useState<boolean>(false);
  const [snackbarError, setSnackbarError] = React.useState<
    string | undefined
  >();

  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const {
    values,
    setFieldValue,
    setFieldTouched,
    validateForm,
    touched,
    setTouched,
    setErrors,
  } = useFormikContext<CreatePrayerGroupForm>();

  const postFile = usePostFile();
  const postPrayerGroup = usePostPrayerGroup();

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

  const uploadPrayerGroupImage = async (): Promise<
    ManagedErrorResponse<RawMediaFile | undefined>
  > => {
    const image = values.image;

    if (!image) {
      return { isError: false, value: undefined };
    }

    const fileToUpload = mapFileToUpload(image);

    const response = await postFile(fileToUpload);
    return response;
  };

  const savePrayerGroup = async () => {
    const errors = await validateForm();

    if (!isEmpty(errors)) {
      setErrors(errors);
      setTouched(setNestedObjectValues({ ...errors, ...touched }, true));
      return;
    }

    setIsLoading(true);
    const imageUploadResponse = await uploadPrayerGroupImage();

    if (imageUploadResponse.isError) {
      setSnackbarError(
        translate("toaster.failed.saveFailure", {
          item: translate("createPrayerGroup.groupImageColorStep.image"),
        })
      );
      setIsLoading(false);
      return;
    }

    const imageId = imageUploadResponse.value?.id;
    const createPrayerGroupRequest = mapCreatePrayerGroupRequest(
      values,
      imageId
    );

    const createPrayerGroupResponse = await postPrayerGroup(
      createPrayerGroupRequest
    );
    setIsLoading(false);

    console.log(createPrayerGroupResponse);

    if (createPrayerGroupResponse.isError) {
      setSnackbarError(
        translate("toaster.failed.saveFailure", {
          item: translate("prayerGroup.label"),
        })
      );
      return;
    }

    // TODO: Redirect to new prayer group
  };

  return {
    isColorPickerModalOpen,
    setIsColorPickerOpen,
    selectImage,
    onRemoveSelectedImage,
    savePrayerGroup,
    snackbarError,
    setSnackbarError,
    isLoading,
    setIsLoading,
  };
};
