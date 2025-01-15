import { GetUserSummaryResponse } from "../api/get-user-summary";
import { UserData } from "../types/context/api-data-context-type";

export const mapUserData = (
  userSummaryResponse: GetUserSummaryResponse
): UserData => {
  return {
    userId: userSummaryResponse.id,
    fullName: userSummaryResponse.fullName,
    email: userSummaryResponse.email,
    username: userSummaryResponse.username,
    image: {
      ...userSummaryResponse.image,
      mediaFileId: userSummaryResponse.id,
    },
  };
};
