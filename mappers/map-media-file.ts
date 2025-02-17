import { ImagePickerAsset } from "expo-image-picker";
import path from "path-browserify";

import { getContentType } from "../helpers/file-helpers";
import {
  FileToUpload,
  FileType,
  MediaFile,
  RawMediaFile,
} from "../types/media-file-types";

export const mapMediaFileFromImagePickerAsset = (
  asset: ImagePickerAsset
): MediaFile => {
  const fileName = path.basename(asset.uri);
  return {
    fileName,
    url: asset.uri,
    filePath: asset.uri,
    fileType: FileType.Image,
  };
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

export const mapMediaFile = (
  rawMediaFile: RawMediaFile | undefined
): MediaFile | undefined => {
  if (!rawMediaFile) {
    return undefined;
  }

  return {
    ...rawMediaFile,
    mediaFileId: rawMediaFile.id,
  };
};
