import * as ImagePicker from "expo-image-picker";
import { Href, router } from "expo-router";
import { setNestedObjectValues, useFormikContext } from "formik";
import { get, isEmpty } from "lodash";
import * as React from "react";

import { usePostFile } from "../../../api/post-file";
import { usePostPrayerGroup } from "../../../api/post-prayer-group";
import { useApiDataContext } from "../../../hooks/use-api-data";
import { useI18N } from "../../../hooks/use-i18n";
import {
  mapFileToUpload,
  mapMediaFileFromImagePickerAsset,
} from "../../../mappers/map-media-file";
import {
  mapCreatePrayerGroupRequest,
  mapPrayerGroupSummaryFromPrayerGroupDetails,
} from "../../../mappers/map-prayer-group";
import { ManagedErrorResponse } from "../../../types/error-handling";
import { MediaFile, RawMediaFile } from "../../../types/media-file-types";
import { CreatePrayerGroupForm } from "../create-prayer-group-types";

export const useGroupImageColorStep = () => {
  const { translate } = useI18N();

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

  const { userData, setUserData } = useApiDataContext();

  const postFile = usePostFile();
  const postPrayerGroup = usePostPrayerGroup();

  const selectImage = async (fieldName: string, aspect: [number, number]) => {
    try {
      await ImagePicker.requestMediaLibraryPermissionsAsync();
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

  const onRemoveSelectedImage = (fieldName: string) => {
    if (!get(values, fieldName)) {
      return;
    }

    setFieldValue(fieldName, undefined, true);
  };

  const uploadPrayerGroupImage = async (
    image: MediaFile | undefined
  ): Promise<ManagedErrorResponse<RawMediaFile | undefined>> => {
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

    const [imageUploadResponse, bannerImageUploadResponse] = await Promise.all([
      uploadPrayerGroupImage(values.avatarFile),
      uploadPrayerGroupImage(values.bannerFile),
    ]);

    if (imageUploadResponse.isError || bannerImageUploadResponse.isError) {
      setSnackbarError(
        translate("toaster.failed.saveFailure", {
          item: translate("createPrayerGroup.groupImageColorStep.image"),
        })
      );
      setIsLoading(false);
      return;
    }

    const imageId = imageUploadResponse.value?.id;
    const bannerImageId = bannerImageUploadResponse.value?.id;

    const createPrayerGroupRequest = mapCreatePrayerGroupRequest(
      values,
      imageId,
      bannerImageId
    );

    const createPrayerGroupResponse = await postPrayerGroup(
      createPrayerGroupRequest
    );
    setIsLoading(false);

    if (createPrayerGroupResponse.isError) {
      setSnackbarError(
        translate("toaster.failed.saveFailure", {
          item: translate("prayerGroup.label"),
        })
      );
      return;
    }

    const prayerGroupId = createPrayerGroupResponse.value.prayerGroupId;

    const prayerGroupSummary = mapPrayerGroupSummaryFromPrayerGroupDetails(
      createPrayerGroupResponse.value
    );

    const prayerGroups = [
      ...(userData?.prayerGroups ?? []),
      prayerGroupSummary,
    ];

    setUserData({ ...userData, prayerGroups });
    prayerGroupId &&
      router.push({
        pathname: "/prayergroup/[id]",
        params: { id: prayerGroupId },
      } as Href<any>);
  };

  return {
    selectImage,
    onRemoveSelectedImage,
    savePrayerGroup,
    snackbarError,
    setSnackbarError,
    isLoading,
    setIsLoading,
  };
};
