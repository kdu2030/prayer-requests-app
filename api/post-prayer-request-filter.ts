import { AxiosInstance } from "axios";
import * as React from "react";

import { handleApiErrors } from "../helpers/api-helpers";
import { useApiDataContext } from "../hooks/use-api-data";
import { ManagedErrorResponse } from "../types/error-handling";
import {
  PrayerRequestFilterCriteria,
  PrayerRequestGetResponse,
} from "../types/prayer-request-types";

const postPrayerRequestFilter = async (
  fetch: AxiosInstance,
  baseUrl: string,
  filterCriteria: PrayerRequestFilterCriteria
): Promise<ManagedErrorResponse<PrayerRequestGetResponse>> => {
  try {
    const url = `${baseUrl}/api/prayerrequest/filter`;

    const response = await fetch.post<PrayerRequestGetResponse>(
      url,
      filterCriteria,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return { isError: false, value: response.data };
  } catch (error) {
    return handleApiErrors(error);
  }
};

export const usePostPrayerRequestFilter = () => {
  const { baseUrl, fetch } = useApiDataContext();

  return React.useCallback(
    (filterCriteria: PrayerRequestFilterCriteria) =>
      postPrayerRequestFilter(fetch, baseUrl, filterCriteria),
    [baseUrl, fetch]
  );
};
