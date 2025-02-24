import { AxiosInstance } from "axios";
import * as React from "react";

import { PrayerGroupRole } from "../constants/prayer-group-constants";
import { handleApiErrors } from "../helpers/api-helpers";
import { useApiDataContext } from "../hooks/use-api-data";
import { ManagedErrorResponse } from "../types/error-handling";
import { RawPrayerGroupUserSummary } from "../types/prayer-group-types";

export type GetPrayerGroupUsersResponse = {
  users: RawPrayerGroupUserSummary[];
};

const getPrayerGroupUsers = async (
  fetch: AxiosInstance,
  baseUrl: string,
  prayerGroupId: number,
  prayerGroupRoles: PrayerGroupRole[]
): Promise<ManagedErrorResponse<GetPrayerGroupUsersResponse>> => {
  const url = `${baseUrl}/api/v1/prayergroup/${prayerGroupId}/users`;

  try {
    const response = await fetch.get<GetPrayerGroupUsersResponse>(url, {
      params: {
        roles: prayerGroupRoles,
      },
    });

    return { isError: false, value: response.data };
  } catch (error) {
    return handleApiErrors(error);
  }
};

export const usePrayerGroupUsers = () => {
  const { fetch, baseUrl } = useApiDataContext();

  return React.useCallback(
    (prayerGroupId: number, prayerGroupRoles: PrayerGroupRole[]) =>
      getPrayerGroupUsers(fetch, baseUrl, prayerGroupId, prayerGroupRoles),
    [fetch, baseUrl]
  );
};
