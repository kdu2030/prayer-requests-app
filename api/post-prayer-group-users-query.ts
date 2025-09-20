import { AxiosInstance } from "axios";
import * as React from "react";

import { PrayerGroupRole } from "../constants/prayer-group-constants";
import { handleApiErrors } from "../helpers/api-helpers";
import { useApiDataContext } from "../hooks/use-api-data";
import { SortConfig } from "../types/api-response-types";
import { ManagedErrorResponse } from "../types/error-handling";
import { PrayerGroupUserSummary } from "../types/prayer-group-types";

export type GetPrayerGroupUsersRequest = {
  prayerGroupRoles?: PrayerGroupRole[];
  sortConfig: SortConfig;
};

export type GetPrayerGroupUsersResponse = {
  prayerGroupUsers: PrayerGroupUserSummary[];
};

const postPrayerGroupUsersQuery = async (
  fetch: AxiosInstance,
  baseUrl: string,
  prayerGroupId: number,
  prayerGroupUsersRequest: GetPrayerGroupUsersRequest
): Promise<ManagedErrorResponse<GetPrayerGroupUsersResponse>> => {
  const url = `${baseUrl}/api/prayergroup/${prayerGroupId}/users`;

  try {
    const response = await fetch.post<GetPrayerGroupUsersResponse>(
      url,
      prayerGroupUsersRequest,
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

export const usePostPrayerGroupUsersQuery = () => {
  const { fetch, baseUrl } = useApiDataContext();

  return React.useCallback(
    (
      prayerGroupId: number,
      prayerGroupUsersRequest: GetPrayerGroupUsersRequest
    ) =>
      postPrayerGroupUsersQuery(
        fetch,
        baseUrl,
        prayerGroupId,
        prayerGroupUsersRequest
      ),
    []
  );
};
