export type RawMediaFile = {
  id?: number;
  fileName?: string;
  url?: string;
  fileType?: FileType;
};

export type MediaFile = {
  mediaFileId?: number;
  fileName?: string;
  url?: string;
  fileType?: FileType;
};

export enum FileType {
  Unknown = 0,
  Image = 1,
}
