export enum PrayerRequestVisibility {
  Private,
  Public,
  FriendsOnly,
  GroupOnly,
}

export enum CanExpireValue {
  Yes = 1,
  No,
}

export type PrayerRequest = {
  applicationUserId?: string;
  title?: string;
  imageUrl?: string;
  visibility?: PrayerRequestVisibility;
  description?: string;
  canExpire?: boolean;
  expiryDate?: Date;
  tags?: string[];
};
