import { AxiosInstance } from "axios";
import * as React from "react";

import { handleApiErrors } from "../helpers/api-helpers";
import { useApiDataContext } from "../hooks/use-api-data";
import { ManagedErrorResponse } from "../types/error-handling";
import { PrayerRequestCommentModel } from "../types/prayer-request-types";

export type PostPrayerRequestCommentRequest = {
  userId: number;
  comment: string;
  submittedDate: string;
};

const postPrayerRequestComment = async (
  fetch: AxiosInstance,
  baseUrl: string,
  prayerRequestId: number,
  commentRequest: PostPrayerRequestCommentRequest,
): Promise<ManagedErrorResponse<PrayerRequestCommentModel>> => {
  try {
    const url = `${baseUrl}/api/prayerrequest/${prayerRequestId}/comment`;

    const response = await fetch.post<PrayerRequestCommentModel>(
      url,
      commentRequest,
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

export const usePostPrayerRequestComment = () => {
  const { baseUrl, fetch } = useApiDataContext();

  return React.useCallback(
    (
      prayerRequestId: number,
      commentRequest: PostPrayerRequestCommentRequest,
    ) => {
      return postPrayerRequestComment(
        fetch,
        baseUrl,
        prayerRequestId,
        commentRequest,
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );
};
