import { AxiosInstance } from "axios";
import * as React from "react";

import { handleApiErrors } from "../helpers/api-helpers";
import { useApiDataContext } from "../hooks/use-api-data";
import { ManagedErrorResponse } from "../types/error-handling";
import { FileToUpload, RawMediaFile } from "../types/media-file-types";

const postFile = async (
  fetch: AxiosInstance,
  baseUrl: string,
  file: FileToUpload
): Promise<ManagedErrorResponse<RawMediaFile>> => {
  try {
    const url = `${baseUrl}/api/file`;
    const formData = new FormData();
    formData.append("file", file as any);

    const response = await fetch.post<RawMediaFile>(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return { isError: false, value: response.data };
  } catch (error) {
    return handleApiErrors(error);
  }
};

export const usePostFile = () => {
  const { fetch, baseUrl } = useApiDataContext();

  return React.useCallback(
    (file: FileToUpload) => postFile(fetch, baseUrl, file),
    [fetch, baseUrl]
  );
};
