import * as ImagePicker from "expo-image-picker";
import { Href, router, usePathname } from "expo-router";
import { FormikHelpers, FormikProps } from "formik";
import * as React from "react";

import { useDeleteFile } from "../../../api/delete-file";
import { usePostFile } from "../../../api/post-file";
import { usePutPrayerGroup } from "../../../api/put-prayer-group";
import { useApiDataContext } from "../../../hooks/use-api-data";
import { useI18N } from "../../../hooks/use-i18n";
import {
  mapFileToUpload,
  mapMediaFile,
  mapMediaFileFromImagePickerAsset,
} from "../../../mappers/map-media-file";
import {
  mapPrayerGroupDetails,
  mapPrayerGroupSummaryFromPrayerGroupDetails,
  mapPrayerGroupToPutPrayerGroupRequest,
} from "../../../mappers/map-prayer-group";
import { PrayerGroupDetails } from "../../../types/prayer-group-types";
import { usePrayerGroupContext } from "../prayer-group-context";
import { UNIQUE_GROUP_NAME_ERROR } from "./edit-prayer-group-constants";

export const usePrayerGroupEdit = () => {
  const { translate } = useI18N();

  const formikRef = React.useRef<FormikProps<PrayerGroupDetails>>(null);
  const { prayerGroupDetails, setPrayerGroupDetails } = usePrayerGroupContext();
  const { userData, setUserData } = useApiDataContext();

  const pathname = usePathname();

  const postFile = usePostFile();
  const putPrayerGroup = usePutPrayerGroup();
  const deleteFile = useDeleteFile();

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

  const removeUnusedPrayerGroupFiles = async (
    originalPrayerGroup: PrayerGroupDetails,
    updatedPrayerGroupDetails: PrayerGroupDetails
  ) => {
    let deleteAvatarPromise;
    let deleteBannerPromise;

    const originalAvatarImageId = originalPrayerGroup.avatarFile?.mediaFileId;
    const updatedAvatarImageId =
      updatedPrayerGroupDetails.avatarFile?.mediaFileId;

    const originalBannerImageId =
      originalPrayerGroup.bannerImageFile?.mediaFileId;
    const updatedBannerImageId =
      updatedPrayerGroupDetails.bannerImageFile?.mediaFileId;

    if (
      originalAvatarImageId &&
      originalAvatarImageId !== updatedAvatarImageId
    ) {
      deleteAvatarPromise = deleteFile(originalAvatarImageId);
    }

    if (
      originalBannerImageId &&
      originalBannerImageId !== updatedBannerImageId
    ) {
      deleteBannerPromise = deleteFile(originalBannerImageId);
    }

    await Promise.all([deleteAvatarPromise, deleteBannerPromise]);
  };

  const savePrayerGroupEdit = async (
    values: PrayerGroupDetails,
    formikHelpers: FormikHelpers<PrayerGroupDetails>
  ) => {
    const valuesToSubmit: PrayerGroupDetails = { ...values };
    const { setFieldError } = formikHelpers;

    setIsLoading(true);
    let imageFilePromise;
    let bannerImagePromise;

    if (values.avatarFile && !values.avatarFile.mediaFileId) {
      imageFilePromise = postFile(mapFileToUpload(values.avatarFile));
    }

    if (values.bannerImageFile && !values.bannerImageFile.mediaFileId) {
      bannerImagePromise = postFile(mapFileToUpload(values.bannerImageFile));
    }

    const [imageFileResponse, bannerImageResponse] = await Promise.all([
      imageFilePromise,
      bannerImagePromise,
    ]);

    if (imageFileResponse?.isError) {
      setSnackbarError(
        translate("toaster.failed.saveFailure", {
          item: translate("createPrayerGroup.groupImageColorStep.image"),
        })
      );
      setIsLoading(false);
      return;
    }

    if (bannerImageResponse?.isError) {
      setSnackbarError(
        translate("toaster.failed.saveFailure", {
          item: translate("createPrayerGroup.groupImageColorStep.banner"),
        })
      );
      setIsLoading(false);
      return;
    }

    if (imageFileResponse?.value) {
      valuesToSubmit.avatarFile = mapMediaFile(imageFileResponse.value);
    }

    if (bannerImageResponse?.value) {
      valuesToSubmit.bannerImageFile = mapMediaFile(bannerImageResponse.value);
    }

    const putPrayerGroupResponse = await putPrayerGroup(
      valuesToSubmit.prayerGroupId ?? -1,
      mapPrayerGroupToPutPrayerGroupRequest(valuesToSubmit)
    );
    setIsLoading(false);

    if (
      putPrayerGroupResponse.isError &&
      putPrayerGroupResponse.error?.dataValidationErrors?.includes(
        UNIQUE_GROUP_NAME_ERROR
      )
    ) {
      setFieldError(
        "groupName",
        translate("form.validation.unique.error", {
          field: translate(
            "createPrayerGroup.groupNameDescription.groupName"
          ).toLocaleLowerCase(),
        })
      );
      return;
    }

    if (putPrayerGroupResponse.isError) {
      setSnackbarError(
        translate("toaster.failed.updateFailure", {
          item: translate("prayerGroup.label"),
        })
      );
      return;
    }

    prayerGroupDetails &&
      removeUnusedPrayerGroupFiles(prayerGroupDetails, valuesToSubmit);

    const responsePrayerGroupDetails = mapPrayerGroupDetails(
      putPrayerGroupResponse.value
    );

    const updatedPrayerGroupDetails: PrayerGroupDetails = {
      ...prayerGroupDetails,
      ...responsePrayerGroupDetails,
      isUserJoined: prayerGroupDetails?.isUserJoined,
      userRole: prayerGroupDetails?.userRole,
      admins: prayerGroupDetails?.admins,
    };

    const prayerGroupSummary = mapPrayerGroupSummaryFromPrayerGroupDetails(
      putPrayerGroupResponse.value
    );

    const prayerGroupSummaries = [...(userData?.prayerGroups ?? [])];

    const summaryIndex = prayerGroupSummaries.findIndex(
      (summary) => summary.prayerGroupId === prayerGroupSummary.prayerGroupId
    );

    prayerGroupSummaries[summaryIndex] = prayerGroupSummary;

    setPrayerGroupDetails(updatedPrayerGroupDetails);
    setUserData({ ...userData, prayerGroups: prayerGroupSummaries });

    router.push({
      pathname: "/(drawer)/prayergroup/[id]",
      params: { id: updatedPrayerGroupDetails.prayerGroupId },
    } as Href<any>);
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
