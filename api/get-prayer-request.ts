import { AxiosInstance } from "axios";
import * as React from "react";

import { handleApiErrors } from "../helpers/api-helpers";
import { useApiDataContext } from "../hooks/use-api-data";
import { ManagedErrorResponse } from "../types/error-handling";
import { PrayerRequestDetailsModel } from "../types/prayer-request-types";

const getPrayerRequest = async (
  fetch: AxiosInstance,
  baseUrl: string,
  prayerRequestId: number,
): Promise<ManagedErrorResponse<PrayerRequestDetailsModel>> => {
  try {
    const url = `${baseUrl}/api/prayerrequest/${prayerRequestId}`;

    const response = await fetch.get<PrayerRequestDetailsModel>(url, {
      headers: { "Content-Type": "application/json" },
    });

    return { isError: false, value: response.data };
  } catch (error) {
    return handleApiErrors(error);
  }
};

export const useGetPrayerRequest = () => {
  const { fetch, baseUrl } = useApiDataContext();

  return React.useCallback(
    (prayerRequestId: number) => {
      return getPrayerRequest(fetch, baseUrl, prayerRequestId);
    },
    [baseUrl, fetch],
  );
};
