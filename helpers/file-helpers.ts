import { FileInfo, getInfoAsync } from "expo-file-system";
import { PathObject } from "path-browserify";

import { ContentType } from "../constants/file-constants";

export const validateFileSizeFromFilePath = async (
  value: string | undefined,
  maxFileSizeBytes: number
) => {
  if (!value) {
    return true;
  }
  const fileInfo: FileInfo = await getInfoAsync(value);

  if (!fileInfo.exists) {
    return true;
  }
  return fileInfo.size < maxFileSizeBytes;
};

export const getContentType = (fileInfo: PathObject): ContentType => {
  const normalizedExtension = fileInfo.ext.toLocaleUpperCase().replace(".", "");

  switch (normalizedExtension) {
    case "JPG":
    case "JPEG":
      return ContentType.ImageJpeg;
    case "PNG":
      return ContentType.ImagePng;
    default:
      return ContentType.ApplicationText;
  }
};
