import { AxiosInstance } from "axios";
import * as React from "react";

import { handleApiErrors } from "../helpers/api-helpers";
import { useApiDataContext } from "../hooks/use-api-data";
import { BaseManagedErrorResponse } from "../types/error-handling";

type PutPrayerGroupAdminsRequest = {
  userIds: number[];
};

export const putPrayerGroupAdmins = async (
  fetch: AxiosInstance,
  baseUrl: string,
  prayerGroupId: number,
  userIds: number[]
): Promise<BaseManagedErrorResponse> => {
  const url = `${baseUrl}/api/v1/prayergroup/${prayerGroupId}/admins`;

  const request: PutPrayerGroupAdminsRequest = {
    userIds,
  };

  try {
    await fetch.put(url, request);
    return { isError: false };
  } catch (error) {
    return handleApiErrors(error);
  }
};

export const usePutPrayerGroupAdmins = () => {
  const { fetch, baseUrl } = useApiDataContext();

  return React.useCallback(
    (prayerGroupId: number, userIds: number[]) =>
      putPrayerGroupAdmins(fetch, baseUrl, prayerGroupId, userIds),
    [baseUrl, fetch]
  );
};
