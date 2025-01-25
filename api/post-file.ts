import { AxiosInstance } from "axios";
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
    const url = `${baseUrl}/api/v1/file`;

    const formData = new FormData();
    formData.append("file", fileBuffer);

    const response = await fetch.post<RawMediaFile>(url, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: formData,
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
