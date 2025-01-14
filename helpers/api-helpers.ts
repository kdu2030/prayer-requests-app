import { AxiosError } from "axios";

import { ManagedErrorResponse } from "../types/error-handling";

export const handleApiErrors = <TResponse>(
  error: any
): ManagedErrorResponse<TResponse> => {
  const axiosError = error as AxiosError;
  return { isError: true, error: axiosError?.response?.data };
};
