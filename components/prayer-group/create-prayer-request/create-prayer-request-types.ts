export type CreatePrayerRequestForm = {
  requestTitle?: string;
  requestDescription?: string;
  timeToLive?: 10 | 15 | 20;
};

export enum CreatePrayerRequestWizardStep {
  RequestBodyStep = "RequestBodyStep",
  ExpirationStep = "ExpirationStep",
}
