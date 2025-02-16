import * as Yup from "yup";

import { validateFileSizeFromFilePath } from "../../../helpers/file-helpers";
import { formatNumber } from "../../../helpers/formatting-helpers";
import { SupportedLanguages, TranslationKey } from "../../../types/languages";
import {
  ACCEPTED_FILE_TYPES,
  MAX_GROUP_IMAGE_SIZE,
  MAX_GROUP_IMAGE_SIZE_MB,
} from "../create-prayer-group-constants";
import { CreatePrayerGroupForm } from "../create-prayer-group-types";

export const groupImageColorValidationSchema = (
  translate: (key: TranslationKey, params?: object) => string,
  cultureCode: SupportedLanguages
): Yup.ObjectSchema<CreatePrayerGroupForm> => {
  const maxFileSize = `${formatNumber(
    MAX_GROUP_IMAGE_SIZE_MB,
    cultureCode
  )} MB`;
  const maxFileSizeError = translate("form.validation.fileSize", {
    size: maxFileSize,
  });

  const fileTypeError = translate("form.validation.imageFileType");

  return Yup.object().shape({
    image: Yup.object()
      .shape({
        filePath: Yup.string()
          .nullable()
          .test("fileType", fileTypeError, (value) => {
            const normalizedValue = value?.toUpperCase();
            return (
              normalizedValue == null ||
              !!ACCEPTED_FILE_TYPES.find((fileType) =>
                normalizedValue.includes(fileType)
              )
            );
          })
          .test("fileSize", maxFileSizeError, async (value) => {
            return await validateFileSizeFromFilePath(
              value ?? undefined,
              MAX_GROUP_IMAGE_SIZE
            );
          }),
      })
      .nullable(),
  }) as Yup.ObjectSchema<CreatePrayerGroupForm>;
};
