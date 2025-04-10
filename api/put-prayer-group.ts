import { AxiosInstance } from "axios";
import * as React from "react";

import { handleApiErrors } from "../helpers/api-helpers";
import { useApiDataContext } from "../hooks/use-api-data";
import { ManagedErrorResponse } from "../types/error-handling";
import { RawPrayerGroupDetails } from "../types/prayer-group-types";

export type PutPrayerGroupRequest = {
  groupName?: string;
  description?: string;
  rules?: string;
  imageFileId?: number;
  bannerImageFileId?: number;
};

const putPrayerGroup = async (
  fetch: AxiosInstance,
  baseUrl: string,
  prayerGroupId: number,
  request: PutPrayerGroupRequest
): Promise<ManagedErrorResponse<RawPrayerGroupDetails>> => {
  const url = `${baseUrl}/api/v1/prayergroup/${prayerGroupId}`;

  try {
    const response = await fetch.put<RawPrayerGroupDetails>(url, request, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return { isError: false, value: response.data };
  } catch (error) {
    return handleApiErrors(error);
  }
};

export const usePutPrayerGroup = () => {
  const { baseUrl, fetch } = useApiDataContext();

  return React.useCallback(
    (prayerGroupId: number, request: PutPrayerGroupRequest) =>
      putPrayerGroup(fetch, baseUrl, prayerGroupId, request),
    [baseUrl, fetch]
  );
};
