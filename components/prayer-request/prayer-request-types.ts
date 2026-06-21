import { TimeToLiveOption } from "../prayer-group/create-prayer-request/create-prayer-request-types";

export enum CommentFormAction {
  Create = "create",
  Edit = "edit",
}

export type PrayerRequestCommentForm = {
  comment?: string;
  formAction: CommentFormAction;
};

export type EditExpirationDateForm = {
  timeToLive: TimeToLiveOption;
};
