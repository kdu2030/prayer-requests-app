import { ApiResponse } from "../../types/api-response-types";
import _ from "lodash";

export const errorsArrayIncludes = <ValueType>(
  apiResponse: ApiResponse<ValueType>,
  field: string,
  error: string
) => {
  if (!apiResponse.isError) {
    return false;
  }

  return (_.get(apiResponse.errors, field, []) as string[]).includes(error);
};
