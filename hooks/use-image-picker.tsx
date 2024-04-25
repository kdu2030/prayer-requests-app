import {
  launchImageLibraryAsync,
  requestCameraPermissionsAsync,
  PermissionResponse,
  launchCameraAsync,
} from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  retrieveJsonFromAsyncStorage,
  storeJsonInAsyncStorage,
} from "../helpers/common/async-storage-helpers";
import {
  IMAGE_CAMERA_PERMISSIONS_KEY,
  IMAGE_PICKER_OPTIONS,
} from "../constants/common/input-constants";

// TODO: Check if expo-file-system package is really necessary, since we aren't using the filesystem yet

export const useImagePicker = () => {
  const getCanShowCamera = async () => {
    const fetchCameraPermissions =
      await retrieveJsonFromAsyncStorage<PermissionResponse>(
        IMAGE_CAMERA_PERMISSIONS_KEY
      );

    const isPermissionValid =
      fetchCameraPermissions?.expires === "never" ||
      (fetchCameraPermissions &&
        new Date(fetchCameraPermissions.expires) > new Date());

    if (
      fetchCameraPermissions &&
      fetchCameraPermissions.granted &&
      !isPermissionValid
    ) {
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

  const displayPhoneCamera = async () => {
    const canShowCamera = await getCanShowCamera();
    if (!canShowCamera) {
      throw new Error("Show Camera not allowed");
    }
    return await launchCameraAsync(IMAGE_PICKER_OPTIONS);
  };

  const showImagePicker = async (showCamera: boolean = false) => {
    let result;

    if (showCamera) {
      displayPhoneCamera();
    }
  };
};
