export interface ValidationErrorResponse {
  errors?: {
    [key: string]: string[];
  };
}

export type ApiResponse<ValueType> =
  | {
      isError: true;
      errors: string[];
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

export enum SortOrder {
  Ascending = 1,
  Descending = 2,
}

export type SortConfig = {
  sortField: string;
  sortOrder: SortOrder;
};
