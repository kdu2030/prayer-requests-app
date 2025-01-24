export enum CreatePrayerGroupWizardStep {
  NameDescriptionStep = 1,
  RulesStep = 2,
  ImageColorStep = 3,
}

export const PRAYER_GROUP_NAME_EXISTS =
  "A prayer group with this name already exists.";

export const NUM_CREATE_PRAYER_GROUP_STEPS = 3;

export const DEFAULT_COLOR = "#106d20";

export const AVAILABLE_PRAYER_GROUP_COLORS = [
  "#cf1717", // red
  "#f59802", // orange
  "#f8fc00", // yellow
  "#0cc71f", // lime green
  "#106d20", // green
  "#11d1ce", // sky blue
  "#0e39c7", // blue
  "#5a0c8a", // purple
  "#bf04b3", // magenta,
  "#000000", // black,
  "#ffffff", // white
];

export const MAX_GROUP_IMAGE_SIZE_MB = 5;
export const MAX_GROUP_IMAGE_SIZE = MAX_GROUP_IMAGE_SIZE_MB * 1024 * 1024;

export const ACCEPTED_FILE_TYPES = ["JPG", "PNG"];
