import * as Yup from "yup";

import { validateFileSizeFromFilePath } from "../../../helpers/file-helpers";
import { formatNumber } from "../../../helpers/formatting-helpers";
import { CultureCode, TranslationKey } from "../../../types/languages";
import {
  MAX_GROUP_BANNER_SIZE,
  MAX_GROUP_BANNER_SIZE_MB,
  MAX_GROUP_IMAGE_SIZE,
  MAX_GROUP_IMAGE_SIZE_MB,
} from "../create-prayer-group-constants";
import { CreatePrayerGroupForm } from "../create-prayer-group-types";
import { validateImageFileName } from "./group-image-step-helpers";

export const groupImageValidationSchema = (
  translate: (key: TranslationKey, params?: object) => string,
  cultureCode: CultureCode
): Yup.ObjectSchema<CreatePrayerGroupForm> => {
  const maxFileSize = `${formatNumber(
    MAX_GROUP_IMAGE_SIZE_MB,
    cultureCode
  )} MB`;

  const bannerFileSize = `${formatNumber(
    MAX_GROUP_BANNER_SIZE_MB,
    cultureCode
  )} MB`;

  const maxFileSizeError = translate("form.validation.fileSize", {
    size: maxFileSize,
  });

  const maxBannerFileSizeError = translate("form.validation.fileSize", {
    size: bannerFileSize,
  });

  const fileTypeError = translate("form.validation.imageFileType");

  return Yup.object().shape({
    image: Yup.object()
      .shape({
        filePath: Yup.string()
          .nullable()
          .test("fileType", fileTypeError, (value) =>
            validateImageFileName(value ?? undefined)
          )
          .test("fileSize", maxFileSizeError, async (value) => {
            return await validateFileSizeFromFilePath(
              value ?? undefined,
              MAX_GROUP_IMAGE_SIZE
            );
          }),
      })
      .nullable(),
    bannerImage: Yup.object().shape({
      filePath: Yup.string()
        .nullable()
        .test((value) => validateImageFileName(value ?? undefined))
        .test("fileSize", maxBannerFileSizeError, async (value) => {
          return await validateFileSizeFromFilePath(
            value ?? undefined,
            MAX_GROUP_BANNER_SIZE
          );
        }),
    }),
  }) as Yup.ObjectSchema<CreatePrayerGroupForm>;
};
