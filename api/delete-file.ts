import { AxiosInstance } from "axios";
import * as React from "react";

import { handleApiErrors } from "../helpers/api-helpers";
import { useApiDataContext } from "../hooks/use-api-data";
import { BaseManagedErrorResponse } from "../types/error-handling";

const deleteFile = async (
  fetch: AxiosInstance,
  baseUrl: string,
  fileId: number
): Promise<BaseManagedErrorResponse> => {
  const url = `${baseUrl}/api/v1/file/${fileId}`;

  try {
    await fetch.delete(url);
    return { isError: false };
  } catch (error) {
    return handleApiErrors(error);
  }
};

export const useDeleteFile = () => {
  const { baseUrl, fetch } = useApiDataContext();

  return React.useCallback(
    (fileId: number) => deleteFile(fetch, baseUrl, fileId),
    [fetch, baseUrl]
  );
};
