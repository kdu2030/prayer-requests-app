import { AxiosInstance } from "axios";
import * as React from "react";

import { handleApiErrors } from "../helpers/api-helpers";
import { useApiDataContext } from "../hooks/use-api-data";
import { BaseManagedErrorResponse } from "../types/error-handling";

const deletePrayerGroupUser = async (
  fetch: AxiosInstance,
  baseUrl: string,
  prayerGroupId: number,
  userId: number
): Promise<BaseManagedErrorResponse> => {
  const url = `${baseUrl}/api/prayergroup/${prayerGroupId}/user/${userId}`;

  try {
    await fetch.delete(url);

    return { isError: false };
  } catch (error) {
    return handleApiErrors(error);
  }
};

export const useDeletePrayerGroupUser = () => {
  const { baseUrl, fetch } = useApiDataContext();

  return React.useCallback(
    (prayerGroupId: number, userId: number) =>
      deletePrayerGroupUser(fetch, baseUrl, prayerGroupId, userId),
    []
  );
};
