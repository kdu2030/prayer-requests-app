import { FileInfo, getInfoAsync } from "expo-file-system";

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
