import { AxiosInstance } from "axios";
import * as React from "react";

import { handleApiErrors } from "../helpers/api-helpers";
import { useApiDataContext } from "../hooks/use-api-data";
import { BaseManagedErrorResponse } from "../types/error-handling";

const deletePrayerRequestComment = async (
  fetch: AxiosInstance,
  baseUrl: string,
  prayerRequestCommentId: number,
): Promise<BaseManagedErrorResponse> => {
  try {
    const url = `${baseUrl}/api/prayerrequest/comment/${prayerRequestCommentId}`;

    const response = await fetch.delete(url);

    return response.data;
  } catch (error) {
    return handleApiErrors(error);
  }
};

export const useDeletePrayerRequestComment = () => {
  const { fetch, baseUrl } = useApiDataContext();

  return React.useCallback((prayerRequestCommentId: number) => {
    return deletePrayerRequestComment(fetch, baseUrl, prayerRequestCommentId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
