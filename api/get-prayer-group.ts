import { AxiosInstance } from "axios";
import * as React from "react";

import { handleApiErrors } from "../helpers/api-helpers";
import { useApiDataContext } from "../hooks/use-api-data";
import { ManagedErrorResponse } from "../types/error-handling";
import { RawPrayerGroupDetails } from "../types/prayer-group-types";

const getPrayerGroup = async (
  fetch: AxiosInstance,
  baseUrl: string,
  prayerGroupId: number
): Promise<ManagedErrorResponse<RawPrayerGroupDetails>> => {
  const url = `${baseUrl}/api/prayergroup/${prayerGroupId}`;

  try {
    const response = await fetch.get<RawPrayerGroupDetails>(url);
    return { isError: false, value: response.data };
  } catch (error) {
    return handleApiErrors(error);
  }
};

export const useGetPrayerGroup = () => {
  const { fetch, baseUrl } = useApiDataContext();

  return React.useCallback(
    (prayerGroupId: number) => getPrayerGroup(fetch, baseUrl, prayerGroupId),
    [baseUrl, fetch]
  );
};
