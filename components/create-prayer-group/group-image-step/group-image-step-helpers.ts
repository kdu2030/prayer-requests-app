import { ACCEPTED_FILE_TYPES } from "../create-prayer-group-constants";

export const validateImageFileName = (value: string | undefined) => {
  const normalizedValue = value?.toUpperCase();
  return (
    normalizedValue == null ||
    !!ACCEPTED_FILE_TYPES.find((fileType) => normalizedValue.includes(fileType))
  );
};
