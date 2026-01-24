import { AxiosInstance } from "axios";
import * as React from "react";

import { handleApiErrors } from "../helpers/api-helpers";
import { useApiDataContext } from "../hooks/use-api-data";
import { BaseManagedErrorResponse } from "../types/error-handling";

const deletePrayerRequestBookmark = async (
  baseUrl: string,
  fetch: AxiosInstance,
  prayerRequestBookmarkId: number,
): Promise<BaseManagedErrorResponse> => {
  const url = `${baseUrl}/api/prayerrequest/bookmark/${prayerRequestBookmarkId}`;

  try {
    await fetch.delete(url, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return { isError: false };
  } catch (error) {
    return handleApiErrors(error);
  }
};

export const useDeletePrayerRequestBookmark = () => {
  const { baseUrl, fetch } = useApiDataContext();

  return React.useCallback(
    (prayerRequestBookmarkId: number) =>
      deletePrayerRequestBookmark(baseUrl, fetch, prayerRequestBookmarkId),
    [baseUrl, fetch],
  );
};
