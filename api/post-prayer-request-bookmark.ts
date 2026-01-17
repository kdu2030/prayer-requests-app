import { AxiosInstance } from "axios";
import * as React from "react";

import { handleApiErrors } from "../helpers/api-helpers";
import { useApiDataContext } from "../hooks/use-api-data";
import { ManagedErrorResponse } from "../types/error-handling";
import {
  PrayerRequestActionCreateRequest,
  PrayerRequestBookmarkModel,
} from "../types/prayer-request-types";

const postPrayerRequestBookmark = async (
  fetch: AxiosInstance,
  baseUrl: string,
  prayerRequestId: number,
  createRequest: PrayerRequestActionCreateRequest,
): Promise<ManagedErrorResponse<PrayerRequestBookmarkModel>> => {
  const url = `${baseUrl}/api/${prayerRequestId}/bookmark`;

  try {
    const response = await fetch.post(url, createRequest, {
      headers: { "Content-Type": "application/json" },
    });

    return { isError: false, value: response.data };
  } catch (error) {
    return handleApiErrors(error);
  }
};

export const usePostPrayerRequestBookmark = () => {
  const { baseUrl, fetch } = useApiDataContext();

  return React.useCallback(
    (
      prayerRequestId: number,
      createRequest: PrayerRequestActionCreateRequest,
    ) =>
      postPrayerRequestBookmark(fetch, baseUrl, prayerRequestId, createRequest),
    [baseUrl, fetch],
  );
};
