import * as Yup from "yup";

import { validateFileSizeFromFilePath } from "../../../helpers/file-helpers";
import { formatNumber } from "../../../helpers/formatting-helpers";
import { CultureCode, TranslationKey } from "../../../types/languages";
import { MediaFile } from "../../../types/media-file-types";
import { PrayerGroupDetails } from "../../../types/prayer-group-types";
import {
  MAX_GROUP_IMAGE_SIZE,
  MAX_GROUP_IMAGE_SIZE_MB,
} from "../../create-prayer-group/create-prayer-group-constants";
import { validateImageFileName } from "../../create-prayer-group/group-image-step/group-image-step-helpers";

export const prayerGroupDetailsValidationSchema = (
  translate: (key: TranslationKey, args?: object) => string,
  cultureCode: CultureCode
): Yup.ObjectSchema<PrayerGroupDetails> => {
  const groupNameRequiredError = translate("form.validation.isRequired.error", {
    field: translate("createPrayerGroup.groupNameDescription.groupName"),
  });

  const descriptionRequiredError = translate(
    "form.validation.isRequired.error",
    {
      field: translate("createPrayerGroup.groupNameDescription.description"),
    }
  );

  const fileTypeError = translate("form.validation.imageFileType");

  const maxImageFileSize = `${formatNumber(
    MAX_GROUP_IMAGE_SIZE_MB,
    cultureCode
  )} MB`;
  const imageFileSizeError = translate("form.validation.fileSize", {
    size: maxImageFileSize,
  });

  return Yup.object().shape({
    prayerGroupId: Yup.number().nullable(),
    rules: Yup.string().nullable(),
    visibilityLevel: Yup.string().nullable(),
    groupName: Yup.string().required(groupNameRequiredError),
    description: Yup.string().required(descriptionRequiredError),
    avatarFile: Yup.object()
      .test("imageFileType", fileTypeError, (file?: MediaFile) => {
        return validateImageFileName(file?.fileName);
      })
      .test("imageFileSize", imageFileSizeError, async (file?: MediaFile) => {
        const isFileSizeValid = await validateFileSizeFromFilePath(
          file?.filePath,
          MAX_GROUP_IMAGE_SIZE
        );
        return isFileSizeValid;
      })
      .nullable(),
  }) as Yup.ObjectSchema<PrayerGroupDetails>;
};
