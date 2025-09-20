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
  Ascending = "ASCENDING",
  Descending = "DESCENDING",
}

export type SortConfig = {
  sortField: string;
  sortDirection: SortOrder;
};

export enum LoadStatus {
  NotStarted = 1,
  Loading,
  Success,
  Error,
}
