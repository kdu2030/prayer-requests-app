import { FileInfo } from "expo-file-system";
import { ImagePickerAsset } from "expo-image-picker";

export const mockImageResult: ImagePickerAsset = {
  assetId: null,
  base64: null,
  duration: null,
  exif: null,
  fileName: null,
  height: 427,
  mimeType: "image/jpeg",
  type: "image",
  uri: "file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252Fprayer-requests-app-e179b3d2-1ea7-478a-a617-e3ef91370748/ImagePicker/b487544a-0510-42b7-b616-98b2bff93f0a.jpeg",
  width: 427,
};

export const mockFileInfo: FileInfo = {
  exists: true,
  isDirectory: false,
  modificationTime: 1737926999.289,
  size: 153863,
  uri: "file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252Fprayer-requests-app-e179b3d2-1ea7-478a-a617-e3ef91370748/ImagePicker/af529fc4-67e2-4822-a017-ef114a631ec8.jpeg",
};
