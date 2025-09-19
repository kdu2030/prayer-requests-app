import * as React from "react";
import { AxiosInstance } from "axios";
import { handleApiErrors } from "../helpers/api-helpers";
import { BaseManagedErrorResponse } from "../types/error-handling";
import { useApiDataContext } from "../hooks/use-api-data";

const deletePrayerGroupUser = async (
  fetch: AxiosInstance,
  baseUrl: string,
  prayerGroupId: number,
  userId: number
): Promise<BaseManagedErrorResponse> => {
  const url = `${baseUrl}/prayergroup/${prayerGroupId}/user/${userId}`;

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
