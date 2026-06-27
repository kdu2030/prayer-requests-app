import { AxiosInstance } from "axios";
import * as React from "react";

import { handleApiErrors } from "../helpers/api-helpers";
import { useApiDataContext } from "../hooks/use-api-data";
import { BaseManagedErrorResponse } from "../types/error-handling";

async function deletePrayerRequest(
  fetch: AxiosInstance,
  baseUrl: string,
  prayerRequestId: number,
): Promise<BaseManagedErrorResponse> {
  const url = `${baseUrl}/api/prayerrequest/${prayerRequestId}`;

  try {
    await fetch.delete(url);
    return { isError: false };
  } catch (error) {
    return handleApiErrors(error);
  }
}

export function useDeletePrayerRequest() {
  const { fetch, baseUrl } = useApiDataContext();

  return React.useCallback(
    (prayerRequestId: number) =>
      deletePrayerRequest(fetch, baseUrl, prayerRequestId),
    [baseUrl, fetch],
  );
}
