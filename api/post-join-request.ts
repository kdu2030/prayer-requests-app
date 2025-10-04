import { AxiosInstance } from "axios";
import * as React from "react";
import { handleApiErrors } from "../helpers/api-helpers";
import { JoinRequestModel } from "../types/join-request-model";
import { ManagedErrorResponse } from "../types/error-handling";
import { useApiDataContext } from "../hooks/use-api-data";

export type JoinRequestCreateRequest = {
  userId: number;
  submittedDate: string;
};

const postJoinRequest = async (
  fetch: AxiosInstance,
  baseUrl: string,
  prayerGroupId: number,
  userId: number
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
    []
  );
};
