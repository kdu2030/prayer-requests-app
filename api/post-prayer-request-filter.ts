import { AxiosInstance } from "axios";
import * as React from "react";

import { handleApiErrors } from "../helpers/api-helpers";
import { useApiDataContext } from "../hooks/use-api-data";
import { ManagedErrorResponse } from "../types/error-handling";
import {
  PrayerRequestFilterCriteria,
  RawPrayerRequestGetResponse,
} from "../types/prayer-request-types";

const postPrayerRequestFilter = async (
  fetch: AxiosInstance,
  baseUrl: string,
  userId: number,
  filterCriteria: PrayerRequestFilterCriteria
): Promise<ManagedErrorResponse<RawPrayerRequestGetResponse>> => {
  try {
    const url = `${baseUrl}/api/v1/prayer-request/filter`;

    if (filterCriteria.pageIndex != 0) {
      throw new Error("");
    }

    const response = await fetch.post<RawPrayerRequestGetResponse>(
      url,
      {
        userId,
        filterCriteria,
      },
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
    (userId: number, filterCriteria: PrayerRequestFilterCriteria) =>
      postPrayerRequestFilter(fetch, baseUrl, userId, filterCriteria),
    [baseUrl, fetch]
  );
};
