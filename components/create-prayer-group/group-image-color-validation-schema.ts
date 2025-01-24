import { FileInfo, getInfoAsync } from "expo-file-system";
import * as Yup from "yup";

import { formatNumber } from "../../helpers/formatting-helpers";
import { SupportedLanguages, TranslationKey } from "../../types/languages";
import {
  MAX_GROUP_IMAGE_SIZE,
  MAX_GROUP_IMAGE_SIZE_MB,
} from "./create-prayer-group-constants";
import { CreatePrayerGroupForm } from "./create-prayer-group-types";

export const groupImageColorValidationSchema = (
  translate: (key: TranslationKey, params: object) => string,
  cultureCode: SupportedLanguages
): Yup.ObjectSchema<CreatePrayerGroupForm> => {
  const maxFileSize = `${formatNumber(
    MAX_GROUP_IMAGE_SIZE_MB,
    cultureCode
  )} MB`;
  const maxFileSizeError = translate("form.validation.fileSize", {
    size: maxFileSize,
  });

  return Yup.object().shape({
    image: Yup.object().shape({
      filePath: Yup.string()
        .nullable()
        .test("fileSize", maxFileSizeError, async (value) => {
          if (!value) {
            return true;
          }
          const fileInfo: FileInfo = await getInfoAsync(value);

          if (!fileInfo.exists) {
            return true;
          }
          return fileInfo.size < MAX_GROUP_IMAGE_SIZE;
        }),
    }),
  }) as Yup.ObjectSchema<CreatePrayerGroupForm>;
};
