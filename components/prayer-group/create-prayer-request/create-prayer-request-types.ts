import { SortConfig } from "../../../types/api-response-types";

export enum TimeToLiveOption {
  OneWeek = 7,
  TwoWeeks = 14,
  ThreeWeeks = 15,
}

export type CreatePrayerRequestForm = {
  requestTitle?: string;
  requestDescription?: string;
  timeToLive?: TimeToLiveOption;
};

export type RawCreatePrayerRequestForm = {
  userId?: number;
  requestTitle?: string;
  requestDescription?: string;
  expirationDate?: string;
};

export enum CreatePrayerRequestWizardStep {
  RequestBodyStep = "RequestBodyStep",
  ExpirationStep = "ExpirationStep",
}

export type PrayerRequestFilterCriteria = {
  prayerGroupIds?: number[];
  creatorUserIds?: number[];
  pageIndex?: number;
  pageSize?: number;
  bookmarkedByUserId?: number;
  includeExpiredRequests?: boolean;
  sortConfig: SortConfig;
};
