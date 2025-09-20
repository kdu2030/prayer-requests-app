import { AxiosInstance } from "axios";
import * as React from "react";

import { PrayerGroupRole } from "../constants/prayer-group-constants";
import { handleApiErrors } from "../helpers/api-helpers";
import { useApiDataContext } from "../hooks/use-api-data";
import { ManagedErrorResponse } from "../types/error-handling";

export type PostPrayerGroupUserResponse = {
  userId?: number;
  fullName?: string;
  prayerGroupRole?: PrayerGroupRole;
};

const postPrayerGroupUser = async (
  fetch: AxiosInstance,
  baseUrl: string,
  prayerGroupId: number,
  userId: number
): Promise<ManagedErrorResponse<PostPrayerGroupUserResponse>> => {
  const url = `${baseUrl}/api/prayergroup/${prayerGroupId}/user/${userId}`;

  try {
    const response = await fetch.post<PostPrayerGroupUserResponse>(url);

    return { isError: false, value: response.data };
  } catch (error) {
    return handleApiErrors(error);
  }
};

export const usePostPrayerGroupUser = () => {
  const { baseUrl, fetch } = useApiDataContext();

  return React.useCallback(
    (prayerGroupId: number, userId: number) =>
      postPrayerGroupUser(fetch, baseUrl, prayerGroupId, userId),
    []
  );
};
