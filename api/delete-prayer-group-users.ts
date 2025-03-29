import { AxiosInstance } from "axios";
import * as React from "react";

import { handleApiErrors } from "../helpers/api-helpers";
import { useApiDataContext } from "../hooks/use-api-data";
import { BaseManagedErrorResponse } from "../types/error-handling";

export type DeletePrayerGroupUserRequest = {
  userIds: number[];
};

const deletePrayerGroupUsers = async (
  fetch: AxiosInstance,
  baseUrl: string,
  prayerGroupId: number,
  userIds: number[]
): Promise<BaseManagedErrorResponse> => {
  const url = `${baseUrl}/api/v1/prayergroup/${prayerGroupId}/users`;

  const request: DeletePrayerGroupUserRequest = {
    userIds,
  };

  try {
    await fetch.delete(url, {
      headers: {
        "Content-Type": "application/json",
      },
      data: request,
    });

    return { isError: false };
  } catch (error) {
    return handleApiErrors(error);
  }
};

export const useDeletePrayerGroupUsers = () => {
  const { fetch, baseUrl } = useApiDataContext();

  return React.useCallback(
    (prayerGroupId: number, userIds: number[]) =>
      deletePrayerGroupUsers(fetch, baseUrl, prayerGroupId, userIds),
    [fetch, baseUrl]
  );
};
