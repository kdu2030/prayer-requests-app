import * as React from "react";
import { AxiosInstance } from "axios";
import { PrayerGroupRole } from "../constants/prayer-group-constants";
import { ManagedErrorResponse } from "../types/error-handling";
import { handleApiErrors } from "../helpers/api-helpers";

export type PrayerGroupUserUpdateModel = {
  prayerGroupId?: number;
  prayerGroupRole?: PrayerGroupRole[];
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
