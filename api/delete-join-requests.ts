import { AxiosInstance } from "axios";
import * as React from "react";

import { useApiDataContext } from "../hooks/use-api-data";

export type JoinRequestDeleteRequestBody = {
  joinRequestIds: number[];
};

const deleteJoinRequests = async (
  fetch: AxiosInstance,
  baseUrl: string,
  prayerGroupId: number,
  joinRequestIds: number[]
) => {
  const url = `${baseUrl}/api/prayergroup/${prayerGroupId}/joinrequests`;

  const requestBody: JoinRequestDeleteRequestBody = {
    joinRequestIds,
  };

  await fetch.delete(url, {
    headers: {
      "Content-Type": "application/json",
    },
    data: requestBody,
  });
};

export const useDeleteJoinRequests = () => {
  const { fetch, baseUrl } = useApiDataContext();

  return React.useCallback(
    (prayerGroupId: number, joinRequestIds: number[]) =>
      deleteJoinRequests(fetch, baseUrl, prayerGroupId, joinRequestIds),
    [baseUrl, fetch]
  );
};
