import * as ImagePicker from "expo-image-picker";
import { Href, router, usePathname } from "expo-router";
import { FormikHelpers, FormikProps } from "formik";
import * as React from "react";

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

  const savePrayerGroupEdit = async (
    values: PrayerGroupDetails,
    formikHelpers: FormikHelpers<PrayerGroupDetails>
  ) => {
    const valuesToSubmit: PrayerGroupDetails = { ...values };
    const { setFieldError } = formikHelpers;

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
      setIsLoading(false);
      return;
    }

    if (imageFileResponse?.value) {
      valuesToSubmit.imageFile = mapMediaFile(imageFileResponse.value);
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
      putPrayerGroupResponse.error?.dataValidationErrors.includes(
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

    const responsePrayerGroupDetails = mapPrayerGroupDetails(
      putPrayerGroupResponse.value
    );

    const updatedPrayerGroupDetails: PrayerGroupDetails = {
      ...prayerGroupDetails,
      ...responsePrayerGroupDetails,
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
