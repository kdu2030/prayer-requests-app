import { AxiosInstance } from "axios";
import * as React from "react";

import { handleApiErrors } from "../helpers/api-helpers";
import { useApiDataContext } from "../hooks/use-api-data";
import { BaseManagedErrorResponse } from "../types/error-handling";

const deletePrayerRequestLike = async (
  fetch: AxiosInstance,
  baseUrl: string,
  prayerRequestLikeId: number,
): Promise<BaseManagedErrorResponse> => {
  const url = `${baseUrl}/api/prayerrequest/${prayerRequestLikeId}/like`;

  try {
    await fetch.delete(url);
    return { isError: false };
  } catch (error) {
    return handleApiErrors(error);
  }
};

export const useDeletePrayerRequestLike = () => {
  const { baseUrl, fetch } = useApiDataContext();

  return React.useCallback(
    (prayerRequestLikeId: number) =>
      deletePrayerRequestLike(fetch, baseUrl, prayerRequestLikeId),
    [baseUrl, fetch],
  );
};
