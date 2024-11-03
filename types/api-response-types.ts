export interface ValidationErrorResponse {
  errors?: {
    [key: string]: string[];
  };
}

export type ApiResponse<ValueType> =
  | {
      isError: true;
      errors?: {
        [key: string]: string[];
      };
    }
  | {
      isError: false;
      value: ValueType;
    };

export enum ApiErrorCode {
  GeneralError = "GEN_ERROR",
  DataValidationError = "DATA_VALIDATION_ERROR",
}

export type ApiErrorResponse = {
  errorCode: ApiErrorCode;
  message?: string;
  url?: string;
  reqMethod?: string;
  dataValidationErrors?: string[];
};
