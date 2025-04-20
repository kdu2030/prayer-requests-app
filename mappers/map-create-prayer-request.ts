import {
  CreatePrayerRequestForm,
  RawCreatePrayerRequestForm,
} from "../components/prayer-group/create-prayer-request/create-prayer-request-types";

export const mapCreatePrayerRequest = (
  userId: number,
  createPrayerRequestForm: CreatePrayerRequestForm
): RawCreatePrayerRequestForm => {
  const expirationDate = new Date();
  const numDaysToAdd = createPrayerRequestForm.timeToLive ?? 0;
  expirationDate.setDate(expirationDate.getDate() + numDaysToAdd);

  return {
    userId,
    requestTitle: createPrayerRequestForm.requestTitle,
    requestDescription: createPrayerRequestForm.requestDescription,
    expirationDate: expirationDate.toISOString(),
  };
};
