export type CreatePrayerRequestForm = {
  requestTitle?: string;
  requestDescription?: string;
  expirationDate?: Date;
};

export enum CreatePrayerRequestWizardSteps {
  RequestBodyStep = "RequestBodyStep",
  ExpirationStep = "ExpirationStep",
}
