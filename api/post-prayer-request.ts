import { AxiosInstance } from "axios";
import * as React from "react";

import { RawCreatePrayerRequestForm } from "../components/prayer-group/create-prayer-request/create-prayer-request-types";
import { handleApiErrors } from "../helpers/api-helpers";
import { useApiDataContext } from "../hooks/use-api-data";
import { ManagedErrorResponse } from "../types/error-handling";
import { PrayerRequestModel } from "../types/prayer-request-types";

export const postPrayerRequest = async (
  fetch: AxiosInstance,
  baseUrl: string,
  createPrayerRequestForm: RawCreatePrayerRequestForm,
): Promise<ManagedErrorResponse<PrayerRequestModel>> => {
  const url = `${baseUrl}/api/prayerrequest`;

  try {
    const response = await fetch.post<PrayerRequestModel>(
      url,
      createPrayerRequestForm,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    return { isError: false, value: response.data };
  } catch (error) {
    return handleApiErrors(error);
  }
};

export const usePostPrayerRequest = () => {
  const { fetch, baseUrl } = useApiDataContext();

  return React.useCallback(
    (createPrayerRequestForm: RawCreatePrayerRequestForm) =>
      postPrayerRequest(fetch, baseUrl, createPrayerRequestForm),
    [baseUrl, fetch],
  );
};
