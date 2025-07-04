import { AxiosInstance } from "axios";
import * as React from "react";

import { handleApiErrors } from "../helpers/api-helpers";
import { useApiDataContext } from "../hooks/use-api-data";
import { BaseManagedErrorResponse } from "../types/error-handling";

const postPrayerRequestLike = async (
  fetch: AxiosInstance,
  baseUrl: string,
  userId: number,
  prayerRequestId: number
): Promise<BaseManagedErrorResponse> => {
  const url = `${baseUrl}/api/v1/prayer-request/${prayerRequestId}/like`;

  try {
    await fetch.post(url, undefined, {
      params: {
        userId,
      },
    });
    return { isError: false };
  } catch (error) {
    return handleApiErrors(error);
  }
};

export const usePostPrayerRequestLike = () => {
  const { baseUrl, fetch } = useApiDataContext();

  return React.useCallback(
    (userId: number, prayerRequestId: number) => {
      return postPrayerRequestLike(fetch, baseUrl, userId, prayerRequestId);
    },
    [baseUrl, fetch]
  );
};
