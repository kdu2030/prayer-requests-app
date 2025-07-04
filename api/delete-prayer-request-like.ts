import { AxiosInstance } from "axios";
import * as React from "react";

import { handleApiErrors } from "../helpers/api-helpers";
import { useApiDataContext } from "../hooks/use-api-data";
import { BaseManagedErrorResponse } from "../types/error-handling";

const deletePrayerRequestLike = async (
  fetch: AxiosInstance,
  baseUrl: string,
  prayerRequestId: number,
  userId: number
): Promise<BaseManagedErrorResponse> => {
  const url = `${baseUrl}/api/v1/prayer-request/${prayerRequestId}/like`;

  try {
    await fetch.delete(url, { params: { userId } });
    return { isError: false };
  } catch (error) {
    return handleApiErrors(error);
  }
};

export const useDeletePrayerRequestLike = () => {
  const { baseUrl, fetch } = useApiDataContext();

  return React.useCallback(
    (prayerRequestId: number, userId: number) =>
      deletePrayerRequestLike(fetch, baseUrl, prayerRequestId, userId),
    [baseUrl, fetch]
  );
};
