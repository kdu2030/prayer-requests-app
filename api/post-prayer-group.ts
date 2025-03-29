import { AxiosInstance } from "axios";
import * as React from "react";

import { handleApiErrors } from "../helpers/api-helpers";
import { useApiDataContext } from "../hooks/use-api-data";
import { ManagedErrorResponse } from "../types/error-handling";
import { RawPrayerGroupDetails } from "../types/prayer-group-types";

export type PostCreatePrayerGroupRequest = {
  groupName?: string;
  description?: string;
  rules?: string;
  color?: string;
  imageFileId?: number;
  bannerImageFileId?: number;
};

const postPrayerGroup = async (
  fetch: AxiosInstance,
  baseUrl: string,
  createPrayerGroupRequest: PostCreatePrayerGroupRequest
): Promise<ManagedErrorResponse<RawPrayerGroupDetails>> => {
  try {
    const url = `${baseUrl}/api/v1/prayergroup`;

    const response = await fetch.post<RawPrayerGroupDetails>(
      url,
      createPrayerGroupRequest,
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

export const usePostPrayerGroup = () => {
  const { fetch, baseUrl } = useApiDataContext();

  return React.useCallback(
    (createPrayerGroupRequest: PostCreatePrayerGroupRequest) =>
      postPrayerGroup(fetch, baseUrl, createPrayerGroupRequest),
    [baseUrl, fetch]
  );
};
