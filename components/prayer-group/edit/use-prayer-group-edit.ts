import * as ImagePicker from "expo-image-picker";
import { usePathname } from "expo-router";
import { FormikHelpers, FormikProps } from "formik";
import * as React from "react";

import { useI18N } from "../../../hooks/use-i18n";
import { mapMediaFileFromImagePickerAsset } from "../../../mappers/map-media-file";
import { PrayerGroupDetails } from "../../../types/prayer-group-types";
import { usePrayerGroupContext } from "../prayer-group-context";

export const usePrayerGroupEdit = () => {
  const { translate } = useI18N();

  const formikRef = React.useRef<FormikProps<PrayerGroupDetails>>(null);
  const { prayerGroupDetails } = usePrayerGroupContext();
  const pathname = usePathname();

  const [snackbarError, setSnackbarError] = React.useState<
    string | undefined
  >();

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

  const savePrayerGroupEdit = (
    values: PrayerGroupDetails,
    formikHelpers: FormikHelpers<PrayerGroupDetails>
  ) => {};

  return {
    formikRef,
    snackbarError,
    setSnackbarError,
    selectImage,
    clearField,
  };
};
