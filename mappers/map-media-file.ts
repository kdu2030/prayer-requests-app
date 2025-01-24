import { ImagePickerAsset } from "expo-image-picker";
import path from "path-browserify";

import { FileType, MediaFile } from "../types/media-file-types";

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
