import { AxiosInstance } from "axios";
import * as React from "react";

import { VisibilityLevel } from "../constants/prayer-group-constants";
import { handleApiErrors } from "../helpers/api-helpers";
import { useApiDataContext } from "../hooks/use-api-data";
import { ManagedErrorResponse } from "../types/error-handling";
import { PrayerGroupDetails } from "../types/prayer-group-types";

export type PutPrayerGroupRequest = {
  groupName?: string;
  description?: string;
  rules?: string;
  avatarFileId?: number;
  bannerFileId?: number;
  visibilityLevel?: VisibilityLevel;
};

const putPrayerGroup = async (
  fetch: AxiosInstance,
  baseUrl: string,
  prayerGroupId: number,
  request: PutPrayerGroupRequest
): Promise<ManagedErrorResponse<PrayerGroupDetails>> => {
  const url = `${baseUrl}/api/prayergroup/${prayerGroupId}`;

  try {
    const response = await fetch.put<PrayerGroupDetails>(url, request, {
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
