import { AxiosInstance } from "axios";
import * as React from "react";

import { handleApiErrors } from "../helpers/api-helpers";
import { useApiDataContext } from "../hooks/use-api-data";
import { ManagedErrorResponse } from "../types/error-handling";
import { PrayerRequestModel } from "../types/prayer-request-types";

export type PutPrayerRequestBody = {
  requestTitle?: string;
  requestDescription?: string;
  expirationDate?: string;
};

async function putPrayerRequest(
  fetch: AxiosInstance,
  baseUrl: string,
  prayerRequestId: number,
  requestBody: PutPrayerRequestBody,
): Promise<ManagedErrorResponse<PrayerRequestModel>> {
  const url = `${baseUrl}/api/prayerrequest/${prayerRequestId}`;

  try {
    const response = await fetch.put(url, requestBody, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return { isError: false, value: response.data };
  } catch (error) {
    return handleApiErrors(error);
  }
}

export function usePutPrayerRequest() {
  const { baseUrl, fetch } = useApiDataContext();

  return React.useCallback(
    (prayerRequestId: number, requestBody: PutPrayerRequestBody) =>
      putPrayerRequest(fetch, baseUrl, prayerRequestId, requestBody),
    [baseUrl, fetch],
  );
}
