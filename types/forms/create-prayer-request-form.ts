export enum PrayerRequestVisibility {
  Private,
  Public,
  FriendsOnly,
  GroupOnly,
}

export type PrayerRequest = {
  applicationUserId?: string;
  title?: string;
  imageUrl?: string;
  visibility?: PrayerRequestVisibility;
  description?: string;
  expiryDate?: string;
  tags?: string[];
};
