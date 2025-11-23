import { AxiosInstance } from "axios";
import * as React from "react";

import { handleApiErrors } from "../helpers/api-helpers";
import { useApiDataContext } from "../hooks/use-api-data";
import { SortConfig } from "../types/api-response-types";
import { ManagedErrorResponse } from "../types/error-handling";
import { JoinRequestModel } from "../types/join-request-types";

export type PostJoinRequestsSearchRequest = {
  sortConfig: SortConfig;
};

export type PostJoinRequestsSearchResponse = {
  joinRequests?: JoinRequestModel[];
};

const postJoinRequestsSearch = async (
  fetch: AxiosInstance,
  baseUrl: string,
  prayerGroupId: number,
  sortConfig: SortConfig
): Promise<ManagedErrorResponse<PostJoinRequestsSearchResponse>> => {
  const url = `${baseUrl}/api/prayergroup/${prayerGroupId}/joinrequests/search`;

  const requestBody: PostJoinRequestsSearchRequest = {
    sortConfig,
  };

  try {
    const response = await fetch.post<PostJoinRequestsSearchResponse>(
      url,
      requestBody,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return { isError: false, value: response.data };
  } catch (error) {
    return handleApiErrors(error);
  }
};

export const usePostJoinRequestsSearch = () => {
  const { baseUrl, fetch } = useApiDataContext();

  return React.useCallback(
    (prayerGroupId: number, sortConfig: SortConfig) =>
      postJoinRequestsSearch(fetch, baseUrl, prayerGroupId, sortConfig),
    [baseUrl, fetch]
  );
};
