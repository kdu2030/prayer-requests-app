import { AxiosInstance } from "axios";
import * as React from "react";

import { handleApiErrors } from "../helpers/api-helpers";
import { useApiDataContext } from "../hooks/use-api-data";
import { ManagedErrorResponse } from "../types/error-handling";
import { PrayerRequestCommentModel } from "../types/prayer-request-types";

export type PutPrayerRequestCommentRequest = {
  comment: string;
};

const putPrayerRequestComment = async (
  fetch: AxiosInstance,
  baseUrl: string,
  prayerRequestCommentId: number,
  commentRequest: PutPrayerRequestCommentRequest,
): Promise<ManagedErrorResponse<PrayerRequestCommentModel>> => {
  const url = `${baseUrl}/api/prayerrequest/comment/${prayerRequestCommentId}`;

  try {
    const response = await fetch.put<PrayerRequestCommentModel>(
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

export const usePutPrayerRequestComment = () => {
  const { fetch, baseUrl } = useApiDataContext();

  return React.useCallback(
    (
      prayerRequestCommentId: number,
      commentRequest: PutPrayerRequestCommentRequest,
    ) => {
      return putPrayerRequestComment(
        fetch,
        baseUrl,
        prayerRequestCommentId,
        commentRequest,
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );
};
