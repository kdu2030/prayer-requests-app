import { AxiosInstance } from "axios";
import * as React from "react";

import { handleApiErrors } from "../helpers/api-helpers";
import { useApiDataContext } from "../hooks/use-api-data";
import { ManagedErrorResponse } from "../types/error-handling";
import { RawPrayerGroupSummary } from "../types/prayer-group-types";

export type GetPrayerGroupsBySearchParams = {
  name: string;
  maxResults: number;
};

const getPrayerGroupsBySearch = async (
  fetch: AxiosInstance,
  baseUrl: string,
  groupNameQuery: string,
  maxResults: number
): Promise<ManagedErrorResponse<RawPrayerGroupSummary[]>> => {
  const url = `${baseUrl}/api/v1/prayergroup/search`;

  const params: GetPrayerGroupsBySearchParams = {
    name: groupNameQuery,
    maxResults,
  };

  try {
    const response = await fetch.get<RawPrayerGroupSummary[]>(url, {
      params,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return { isError: false, value: response.data };
  } catch (error) {
    console.log(error);
    return handleApiErrors(error);
  }
};

export const useGetPrayerGroupsBySearch = () => {
  const { fetch, baseUrl } = useApiDataContext();

  return React.useCallback(
    (groupNameQuery: string, maxResults: number) =>
      getPrayerGroupsBySearch(fetch, baseUrl, groupNameQuery, maxResults),
    [fetch, baseUrl]
  );
};
