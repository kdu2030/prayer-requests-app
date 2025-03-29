import { AxiosInstance } from "axios";
import * as React from "react";

import { PrayerGroupRole } from "../constants/prayer-group-constants";
import { handleApiErrors } from "../helpers/api-helpers";
import { useApiDataContext } from "../hooks/use-api-data";
import { BaseManagedErrorResponse } from "../types/error-handling";

export type PrayerGroupUserToAdd = {
  id: number;
  role: PrayerGroupRole;
};

export type PostPrayerGroupUsersRequest = {
  users: PrayerGroupUserToAdd[];
};

const postPrayerGroupUsers = async (
  fetch: AxiosInstance,
  baseUrl: string,
  prayerGroupId: number,
  prayerGroupUsersToAdd: PrayerGroupUserToAdd[]
): Promise<BaseManagedErrorResponse> => {
  const url = `${baseUrl}/api/v1/prayergroup/${prayerGroupId}/users`;
  const requestBody: PostPrayerGroupUsersRequest = {
    users: prayerGroupUsersToAdd,
  };

  try {
    await fetch.post<void>(url, requestBody, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return { isError: false };
  } catch (error) {
    return handleApiErrors(error);
  }
};

export const usePostPrayerGroupUsers = () => {
  const { baseUrl, fetch } = useApiDataContext();

  return React.useCallback(
    (prayerGroupId: number, prayerGroupUsers: PrayerGroupUserToAdd[]) =>
      postPrayerGroupUsers(fetch, baseUrl, prayerGroupId, prayerGroupUsers),
    [baseUrl, fetch]
  );
};
