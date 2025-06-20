import { AxiosInstance } from "axios";
import * as React from "react";

import {
  PrayerRequestFilterCriteria,
  RawPrayerRequestModel,
} from "../components/prayer-group/prayer-group-types";
import { handleApiErrors } from "../helpers/api-helpers";
import { useApiDataContext } from "../hooks/use-api-data";
import { ManagedErrorResponse } from "../types/error-handling";

const postPrayerRequestFilter = async (
  fetch: AxiosInstance,
  baseUrl: string,
  userId: number,
  filterCriteria: PrayerRequestFilterCriteria
): Promise<ManagedErrorResponse<RawPrayerRequestModel[]>> => {
  try {
    const url = `${baseUrl}/api/v1/prayer-request/filter`;

    const response = await fetch.post<RawPrayerRequestModel[]>(
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
