import * as React from "react";
import { AxiosInstance } from "axios";
import { PrayerGroupRole } from "../constants/prayer-group-constants";
import { SortConfig } from "../types/api-response-types";
import { PrayerGroupUserSummary } from "../types/prayer-group-types";
import { ManagedErrorResponse } from "../types/error-handling";
import { handleApiErrors } from "../helpers/api-helpers";
import { useApiDataContext } from "../hooks/use-api-data";

export type GetPrayerGroupUsersRequest = {
  prayerGroupRoles?: PrayerGroupRole[];
  sortConfig: SortConfig;
};

export type GetPrayerGroupUsersResponse = {
  prayerGroupUsers: PrayerGroupUserSummary[];
};

const postPrayerGroupUsersSearch = async (
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

export const usePostGroupUsersSearch = () => {
  const { fetch, baseUrl } = useApiDataContext();

  return React.useCallback(
    (
      prayerGroupId: number,
      prayerGroupUsersRequest: GetPrayerGroupUsersRequest
    ) =>
      postPrayerGroupUsersSearch(
        fetch,
        baseUrl,
        prayerGroupId,
        prayerGroupUsersRequest
      ),
    []
  );
};
