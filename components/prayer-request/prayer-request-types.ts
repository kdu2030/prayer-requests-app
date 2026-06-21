export enum CommentFormAction {
  Create = "create",
  Edit = "edit",
}

export type PrayerRequestCommentForm = {
  comment?: string;
  formAction: CommentFormAction;
};

export type EditExpirationDateForm = {
  expirationDate: string;
};
