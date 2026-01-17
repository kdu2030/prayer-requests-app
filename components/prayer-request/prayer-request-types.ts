export type PrayerRequestActionCreateRequest = {
  userId: number;
  submittedDate: string;
};

export type PrayerRequestLikeModel = {
  prayerRequestLikeId?: number;
  prayerRequestId?: number;
  submittedUserId?: number;
  submittedDate?: string;
};
