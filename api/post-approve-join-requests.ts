import { AxiosInstance } from "axios";
import * as React from "react";

import { useApiDataContext } from "../hooks/use-api-data";

export type PostApproveJoinRequestBody = {
  joinRequestIds: number[];
};

const postApproveJoinRequest = async (
  fetch: AxiosInstance,
  baseUrl: string,
  prayerGroupId: number,
  joinRequestIds: number[]
) => {
  const url = `${baseUrl}/api/prayergroup/${prayerGroupId}/joinrequests`;

  const requestBody: PostApproveJoinRequestBody = {
    joinRequestIds,
  };

  await fetch.post(url, requestBody, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const usePostApproveJoinRequest = () => {
  const { baseUrl, fetch } = useApiDataContext();

  return React.useCallback(
    (prayerGroupId: number, joinRequestIds: number[]) =>
      postApproveJoinRequest(fetch, baseUrl, prayerGroupId, joinRequestIds),
    [baseUrl, fetch]
  );
};
