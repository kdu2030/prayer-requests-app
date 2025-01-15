export type ManagedErrorResponse<ValueType> =
  | {
      isError: true;
      error: any;
    }
  | { isError: false; value: ValueType };

export type BaseManagedErrorResponse =
  | { isError: false }
  | { isError: true; error: any };
