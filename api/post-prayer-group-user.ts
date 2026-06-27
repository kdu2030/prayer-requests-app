import { AxiosInstance } from "axios";
import * as React from "react";

import { PrayerGroupRole } from "../constants/prayer-group-constants";
import { handleApiErrors } from "../helpers/api-helpers";
import { useApiDataContext } from "../hooks/use-api-data";
import { ManagedErrorResponse } from "../types/error-handling";

export type PostPrayerGroupUserRequest = {
  joinDate: string;
};

export type PostPrayerGroupUserResponse = {
  userId?: number;
  fullName?: string;
  prayerGroupRole?: PrayerGroupRole;
  joinDate?: string;
};

const postPrayerGroupUser = async (
  fetch: AxiosInstance,
  baseUrl: string,
  prayerGroupId: number,
  userId: number,
): Promise<ManagedErrorResponse<PostPrayerGroupUserResponse>> => {
  const url = `${baseUrl}/api/prayergroup/${prayerGroupId}/user/${userId}`;

  const requestBody: PostPrayerGroupUserRequest = {
    joinDate: new Date().toISOString(),
  };

  try {
    const response = await fetch.post<PostPrayerGroupUserResponse>(
      url,
      requestBody,
    );

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
    [baseUrl, fetch],
  );
};
