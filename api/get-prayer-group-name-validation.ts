import { AxiosInstance } from "axios";
import * as React from "react";

import { handleApiErrors } from "../helpers/api-helpers";
import { useApiDataContext } from "../hooks/use-api-data";
import { ManagedErrorResponse } from "../types/error-handling";

export type GetPrayerGroupNameValidationResponse = {
  isNameValid?: boolean;
  errors?: string[];
};

const getPrayerGroupNameValidation = async (
  fetch: AxiosInstance,
  baseUrl: string,
  prayerGroupName: string
): Promise<ManagedErrorResponse<GetPrayerGroupNameValidationResponse>> => {
  try {
    const url = `${baseUrl}/api/prayergroup/validate-name`;
    const response = await fetch.get<GetPrayerGroupNameValidationResponse>(
      url,
      {
        headers: {
          "Content-Type": "application/json",
        },
        params: {
          name: prayerGroupName,
        },
      }
    );

    return { isError: false, value: response.data };
  } catch (error) {
    return handleApiErrors(error);
  }
};

export const useGetPrayerGroupNameValidation = () => {
  const { fetch, baseUrl } = useApiDataContext();

  return React.useCallback(
    (prayerGroupName: string) =>
      getPrayerGroupNameValidation(fetch, baseUrl, prayerGroupName),
    [fetch, baseUrl]
  );
};
