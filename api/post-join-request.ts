import { AxiosInstance } from "axios";
import * as React from "react";

import { handleApiErrors } from "../helpers/api-helpers";
import { useApiDataContext } from "../hooks/use-api-data";
import { ManagedErrorResponse } from "../types/error-handling";
import { JoinRequestModel } from "../types/join-request-types";

export type JoinRequestCreateRequest = {
  userId: number;
  submittedDate: string;
};

const postJoinRequest = async (
  fetch: AxiosInstance,
  baseUrl: string,
  prayerGroupId: number,
  userId: number,
): Promise<ManagedErrorResponse<JoinRequestModel>> => {
  const url = `${baseUrl}/api/prayergroup/${prayerGroupId}/joinrequest`;

  const requestBody: JoinRequestCreateRequest = {
    userId,
    submittedDate: new Date().toISOString(),
  };

  try {
    const response = await fetch.post<JoinRequestModel>(url, requestBody, {
      headers: { "Content-Type": "application/json" },
    });

    return { isError: false, value: response.data };
  } catch (error) {
    return handleApiErrors(error);
  }
};

export const usePostJoinRequest = () => {
  const { baseUrl, fetch } = useApiDataContext();

  return React.useCallback(
    (prayerGroupId: number, userId: number) =>
      postJoinRequest(fetch, baseUrl, prayerGroupId, userId),
    [baseUrl, fetch],
  );
};
