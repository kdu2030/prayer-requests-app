import {
  launchImageLibraryAsync,
  requestCameraPermissionsAsync,
  PermissionResponse,
  launchCameraAsync,
} from "expo-image-picker";
import {
  retrieveJsonFromAsyncStorage,
  storeJsonInAsyncStorage,
} from "../common/async-storage-helpers";
import {
  IMAGE_CAMERA_PERMISSIONS_KEY,
  IMAGE_PICKER_OPTIONS,
} from "../../constants/common/input-constants";

// TODO: Check if expo-file-system package is really necessary, since we aren't using the filesystem yet

export const isStoragePermissionValid = async (permissionsKey: string) => {
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

export const getCanShowCamera = async () => {
  const canShowCamera = await isStoragePermissionValid(
    IMAGE_CAMERA_PERMISSIONS_KEY
  );

  if (canShowCamera) {
    return true;
  }

  const permissionsResult = await requestCameraPermissionsAsync();

  if (permissionsResult.granted) {
    await storeJsonInAsyncStorage(
      IMAGE_CAMERA_PERMISSIONS_KEY,
      permissionsResult
    );
    return true;
  }

  return false;
};

export const displayPhoneCamera = async () => {
  const canShowCamera = await getCanShowCamera();
  if (!canShowCamera) {
    throw new Error("Show Camera not allowed");
  }
  return await launchCameraAsync(IMAGE_PICKER_OPTIONS);
};

export const showImagePicker = async (showCamera: boolean = false) => {
  let result;

  if (showCamera) {
    result = await displayPhoneCamera();
  }
};
