export type CreatePrayerRequestForm = {
  requestTitle?: string;
  requestDescription?: string;
  expirationDate?: Date;
};

export enum CreatePrayerRequestWizardStep {
  RequestBodyStep = "RequestBodyStep",
  ExpirationStep = "ExpirationStep",
}
