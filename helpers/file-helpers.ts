import { Buffer } from "buffer";
import {
  EncodingType,
  FileInfo,
  getInfoAsync,
  readAsStringAsync,
} from "expo-file-system";
import path from "path-browserify";

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

export const getContentTypeFromFilePath = (filePath: string): ContentType => {
  const fileInfo = path.parse(filePath);
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

export const getBlobFromFilePath = async (
  filePath: string,
  contentType: ContentType
): Promise<Blob> => {
  const fileContent = await readAsStringAsync(filePath, {
    encoding: EncodingType.Base64,
  });

  const fileBlob = new Blob([Buffer.from(fileContent, "base64")], {
    type: contentType,
  });

  console.log(fileBlob);

  return fileBlob;
};
