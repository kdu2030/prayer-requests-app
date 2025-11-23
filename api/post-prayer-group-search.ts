import { AxiosInstance } from "axios";
import * as React from "react";

import { handleApiErrors } from "../helpers/api-helpers";
import { useApiDataContext } from "../hooks/use-api-data";
import { ManagedErrorResponse } from "../types/error-handling";
import { PrayerGroupSummary } from "../types/prayer-group-types";

export type PostPrayerGroupSearchRequest = {
  groupNameQuery: string;
  maxNumResults?: number;
};

export type PostPrayerGroupSearchResponse = {
  prayerGroups?: PrayerGroupSummary[];
};

const postPrayerGroupSearch = async (
  fetch: AxiosInstance,
  baseUrl: string,
  groupNameQuery: string,
  maxNumResults?: number
): Promise<ManagedErrorResponse<PostPrayerGroupSearchResponse>> => {
  const url = `${baseUrl}/api/prayergroup/search`;

  const prayerGroupSearchRequest: PostPrayerGroupSearchRequest = {
    groupNameQuery,
    maxNumResults,
  };

  try {
    const response = await fetch.post<PostPrayerGroupSearchResponse>(
      url,
      prayerGroupSearchRequest,
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

export const usePostPrayerGroupSearch = () => {
  const { baseUrl, fetch } = useApiDataContext();

  return React.useCallback(
    (groupNameQuery: string, maxNumResults?: number) =>
      postPrayerGroupSearch(fetch, baseUrl, groupNameQuery, maxNumResults),
    []
  );
};
