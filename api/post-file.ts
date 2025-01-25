import { AxiosInstance } from "axios";
import { Blob } from "buffer";
import * as React from "react";

import { handleApiErrors } from "../helpers/api-helpers";
import { useApiDataContext } from "../hooks/use-api-data";
import { ManagedErrorResponse } from "../types/error-handling";
import { RawMediaFile } from "../types/media-file-types";

const postFile = async (
  fetch: AxiosInstance,
  baseUrl: string,
  fileBuffer: Blob
): Promise<ManagedErrorResponse<RawMediaFile>> => {
  try {
    // TODO: Fix this, Expo does not support Blobs
    // See this: https://stackoverflow.com/questions/66372873/react-native-expo-post-blob
    const url = `${baseUrl}/api/v1/file`;

    const response = await fetch.postForm<RawMediaFile>(url, {
      file: fileBuffer,
    });

    return { isError: false, value: response.data };
  } catch (error) {
    return handleApiErrors(error);
  }
};

export const usePostFile = () => {
  const { fetch, baseUrl } = useApiDataContext();

  return React.useCallback(
    (fileBuffer: Blob) => postFile(fetch, baseUrl, fileBuffer),
    [fetch, baseUrl]
  );
};
