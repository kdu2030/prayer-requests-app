import { ImagePickerOptions, MediaTypeOptions } from "expo-image-picker";

export const MULTILINE_INPUT_NUM_LINES = 5;

export const DATE_INPUT_FORMAT_OPTIONS: Intl.DateTimeFormatOptions = {
  month: "2-digit",
  day: "2-digit",
  year: "numeric",
};

export const IMAGE_PICKER_OPTIONS: ImagePickerOptions = {
  allowsEditing: true,
  mediaTypes: MediaTypeOptions.Images,
};

export const CAMERA_PERMISSIONS_KEY =
  "prayerRequestsApp.imageCameraPermissions";

export const IMAGE_LIBRARY_PERMISSIONS_KEY =
  "prayerRequestsApp.imageLibraryPermissions";
