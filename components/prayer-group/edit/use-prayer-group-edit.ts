import * as ImagePicker from "expo-image-picker";
import { usePathname } from "expo-router";
import { FormikHelpers, FormikProps } from "formik";
import * as React from "react";

import { usePostFile } from "../../../api/post-file";
import { useI18N } from "../../../hooks/use-i18n";
import {
  mapFileToUpload,
  mapMediaFile,
  mapMediaFileFromImagePickerAsset,
} from "../../../mappers/map-media-file";
import { PrayerGroupDetails } from "../../../types/prayer-group-types";
import { usePrayerGroupContext } from "../prayer-group-context";

export const usePrayerGroupEdit = () => {
  const { translate } = useI18N();

  const formikRef = React.useRef<FormikProps<PrayerGroupDetails>>(null);
  const { prayerGroupDetails } = usePrayerGroupContext();
  const pathname = usePathname();

  const postFile = usePostFile();

  const [snackbarError, setSnackbarError] = React.useState<
    string | undefined
  >();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  React.useEffect(() => {
    formikRef.current?.resetForm({ values: prayerGroupDetails });
  }, [prayerGroupDetails, pathname]);

  const selectImage = async (fieldName: string, aspect: [number, number]) => {
    if (!formikRef.current) {
      return;
    }

    const { setFieldValue, setFieldTouched } = formikRef.current;

    try {
      await ImagePicker.requestCameraPermissionsAsync();
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect,
        quality: 1,
      });

      const imageResult = result.assets ? result.assets[0] : undefined;
      if (!imageResult) {
        return;
      }

      setFieldValue(fieldName, mapMediaFileFromImagePickerAsset(imageResult));
      setTimeout(() => setFieldTouched(fieldName, true), 0);
    } catch (error) {
      setSnackbarError(
        translate("createPrayerGroup.groupImageColorStep.unableToSelectImage")
      );
    }
  };

  const clearField = (fieldName: string) => {
    if (!formikRef.current) {
      return;
    }

    const { setFieldValue, setFieldTouched } = formikRef.current;

    setFieldValue(fieldName, undefined);
    setTimeout(() => setFieldTouched(fieldName, true), 0);
  };

  const savePrayerGroupEdit = async (values: PrayerGroupDetails) => {
    const valuesToSubmit: PrayerGroupDetails = { ...values };

    setIsLoading(true);
    let imageFilePromise;
    let bannerImagePromise;

    if (values.imageFile && !values.imageFile.mediaFileId) {
      imageFilePromise = postFile(mapFileToUpload(values.imageFile));
    }

    if (values.bannerImageFile && !values.bannerImageFile.mediaFileId) {
      bannerImagePromise = postFile(mapFileToUpload(values.bannerImageFile));
    }

    const [imageFileResponse, bannerImageResponse] = await Promise.all([
      imageFilePromise,
      bannerImagePromise,
    ]);

    if (imageFileResponse?.isError || bannerImageResponse?.isError) {
      setSnackbarError(
        translate("toaster.failed.saveFailure", {
          item: translate("createPrayerGroup.groupImageColorStep.image"),
        })
      );
      return;
    }

    if (imageFileResponse?.value) {
      valuesToSubmit.imageFile = mapMediaFile(imageFileResponse.value);
    }

    if (bannerImageResponse?.value) {
      valuesToSubmit.bannerImageFile = mapMediaFile(bannerImageResponse.value);
    }

    setIsLoading(false);

    console.log(valuesToSubmit);
  };

  return {
    formikRef,
    snackbarError,
    setSnackbarError,
    selectImage,
    clearField,
    isLoading,
    savePrayerGroupEdit,
  };
};
