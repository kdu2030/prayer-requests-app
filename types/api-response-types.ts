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
