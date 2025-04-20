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

export enum CreatePrayerRequestWizardStep {
  RequestBodyStep = "RequestBodyStep",
  ExpirationStep = "ExpirationStep",
}
