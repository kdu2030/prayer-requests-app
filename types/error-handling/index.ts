export type ManagedErrorResponse<ValueType> =
  | {
      isError: true;
      error: any;
    }
  | { isError: false; value?: ValueType };
