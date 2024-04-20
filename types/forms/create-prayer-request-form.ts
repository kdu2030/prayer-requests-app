import { DateValue } from "../inputs/select";

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
  canExpire?: boolean;
  expiryDate?: Date;
  expiryDateStr?: string;
  tags?: string[];
};
