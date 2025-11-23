import { AxiosInstance } from "axios";
import * as React from "react";

import { RawCreatePrayerRequestForm } from "../components/prayer-group/create-prayer-request/create-prayer-request-types";
import { handleApiErrors } from "../helpers/api-helpers";
import { useApiDataContext } from "../hooks/use-api-data";
import { BaseManagedErrorResponse } from "../types/error-handling";

export const postPrayerRequest = async (
  fetch: AxiosInstance,
  baseUrl: string,
  createPrayerRequestForm: RawCreatePrayerRequestForm
): Promise<BaseManagedErrorResponse> => {
  const url = `${baseUrl}/api/prayerrequest`;

  try {
    await fetch.post(url, createPrayerRequestForm, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return { isError: false };
  } catch (error) {
    return handleApiErrors(error);
  }
};

export const usePostPrayerRequest = () => {
  const { fetch, baseUrl } = useApiDataContext();

  return React.useCallback(
    (createPrayerRequestForm: RawCreatePrayerRequestForm) =>
      postPrayerRequest(fetch, baseUrl, createPrayerRequestForm),
    [baseUrl, fetch]
  );
};
