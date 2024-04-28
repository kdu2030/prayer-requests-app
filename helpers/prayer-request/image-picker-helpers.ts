import {
  launchImageLibraryAsync,
  requestCameraPermissionsAsync,
  PermissionResponse,
  launchCameraAsync,
  requestMediaLibraryPermissionsAsync,
  ImagePickerResult,
} from "expo-image-picker";
import {
  retrieveJsonFromAsyncStorage,
  storeJsonInAsyncStorage,
} from "../common/async-storage-helpers";
import {
  CAMERA_PERMISSIONS_KEY,
  IMAGE_LIBRARY_PERMISSIONS_KEY,
  IMAGE_PICKER_OPTIONS,
} from "../../constants/common/input-constants";

// TODO: Check if expo-file-system package is really necessary, since we aren't using the filesystem yet

export const isStoragePermissionValid = async (
  permissionsKey: string
): Promise<boolean> => {
  const permissions = await retrieveJsonFromAsyncStorage<PermissionResponse>(
    permissionsKey
  );

  if (!permissions || !permissions.granted) {
    return false;
  }

  const isPermissionActive =
    permissions.expires === "never" ||
    new Date(permissions.expires) >= new Date();

  return isPermissionActive;
};

export const getCanShowCamera = async (): Promise<boolean> => {
  const canShowCamera = await isStoragePermissionValid(CAMERA_PERMISSIONS_KEY);

  if (canShowCamera) {
    return true;
  }

  const permissionsResult = await requestCameraPermissionsAsync();

  if (permissionsResult.granted) {
    await storeJsonInAsyncStorage(CAMERA_PERMISSIONS_KEY, permissionsResult);
    return true;
  }

  return false;
};

export const getCanShowImageLibrary = async (): Promise<boolean> => {
  const canShowImageLibrary = await isStoragePermissionValid(
    IMAGE_LIBRARY_PERMISSIONS_KEY
  );

  if (canShowImageLibrary) {
    return true;
  }

  const permissionsResult = await requestMediaLibraryPermissionsAsync();

  if (permissionsResult.granted) {
    await storeJsonInAsyncStorage(
      IMAGE_LIBRARY_PERMISSIONS_KEY,
      permissionsResult
    );
    return true;
  }

  return false;
};

export const displayPhoneCamera = async (): Promise<ImagePickerResult> => {
  const canShowCamera = await getCanShowCamera();
  if (!canShowCamera) {
    throw new Error("Camera access not allowed");
  }
  return await launchCameraAsync(IMAGE_PICKER_OPTIONS);
};

export const displayImagePicker = async (): Promise<ImagePickerResult> => {
  const canShowImageLibrary = await getCanShowImageLibrary();

  if (!canShowImageLibrary) {
    throw new Error("Image library access not allowed");
  }

  return await launchImageLibraryAsync(IMAGE_PICKER_OPTIONS);
};
