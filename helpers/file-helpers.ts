import { Buffer } from "buffer";
import {
  EncodingType,
  FileInfo,
  getInfoAsync,
  readAsStringAsync,
} from "expo-file-system";
import path, { PathObject } from "path-browserify";

import { ContentType } from "../constants/file-constants";
import { FileToUpload, MediaFile } from "../types/media-file-types";

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

export const mapFileToUpload = (image: MediaFile): FileToUpload => {
  const fileInfo = path.parse(image.fileName ?? "");
  const contentType = getContentType(fileInfo);
  return {
    uri: image.filePath ?? "",
    type: contentType,
    name: image.fileName ?? "",
  };
};
