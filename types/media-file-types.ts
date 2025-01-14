export type MediaFile = {
  id?: number;
  fileName?: string;
  url?: string;
  fileType?: FileType;
};

export enum FileType {
  Unknown = 0,
  Image = 1,
}
