import { decode } from "base-64";

import { Token } from "../../types/context/api-data-context-type";
import { JwtTokenFields } from "./auth-constants";

export const decodeJwtToken = (token: string): Token => {
  const tokenParts = token.split(".");
  const payload = JSON.parse(decode(tokenParts[1]));
  // exp field is in seconds since Jan 1, 1970. Date constructor expects ms since 1970
  const expiryDate = new Date(payload[JwtTokenFields.ExpiryDateSecs] * 1000);

  return {
    token,
    expiryDate,
  };
};
