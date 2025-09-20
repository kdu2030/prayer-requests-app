import { AxiosInstance } from "axios";
import * as React from "react";

import { PrayerGroupRole } from "../constants/prayer-group-constants";
import { handleApiErrors } from "../helpers/api-helpers";
import { useApiDataContext } from "../hooks/use-api-data";
import { ManagedErrorResponse } from "../types/error-handling";

export type PrayerGroupUserUpdateModel = {
  userId?: number;
  prayerGroupRole?: PrayerGroupRole;
};

export type PutPrayerGroupUserUpdateRequest = {
  prayerGroupUsers: PrayerGroupUserUpdateModel[];
};

export type PutPrayerGroupUserUpdateResponse = {
  prayerGroupUsers?: PrayerGroupUserUpdateModel[];
};

const putPrayerGroupUsers = async (
  fetch: AxiosInstance,
  baseUrl: string,
  prayerGroupId: number,
  prayerGroupUsers: PrayerGroupUserUpdateModel[]
): Promise<ManagedErrorResponse<PutPrayerGroupUserUpdateResponse>> => {
  const url = `${baseUrl}/api/prayergroup/${prayerGroupId}/users`;

  const prayerGroupUsersRequest: PutPrayerGroupUserUpdateRequest = {
    prayerGroupUsers,
  };

  try {
    const response = await fetch.put<PutPrayerGroupUserUpdateResponse>(
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

export const usePutPrayerGroupUsers = () => {
  const { fetch, baseUrl } = useApiDataContext();

  return React.useCallback(
    (prayerGroupId: number, prayerGroupUsers: PrayerGroupUserUpdateModel[]) =>
      putPrayerGroupUsers(fetch, baseUrl, prayerGroupId, prayerGroupUsers),
    []
  );
};
