import { ImagePickerAsset } from "expo-image-picker";
import path from "path-browserify";

import { getContentType } from "../helpers/file-helpers";
import { FileToUpload, FileType, MediaFile } from "../types/media-file-types";

export const mapMediaFileFromImagePickerAsset = (
  asset: ImagePickerAsset
): MediaFile => {
  const fileName = path.basename(asset.uri);
  return {
    fileName,
    fileUrl: asset.uri,
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
