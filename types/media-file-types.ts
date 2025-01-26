import { ContentType } from "../constants/file-constants";

export type RawMediaFile = {
  id?: number;
  fileName?: string;
  url?: string;
  fileType?: FileType;
};

// url is what is used to display the image, could be the same as file path if not uploaded.
export type MediaFile = {
  mediaFileId?: number;
  fileName?: string;
  url?: string;
  fileType?: FileType;
  filePath?: string;
};

export enum FileType {
  Unknown = 0,
  Image = 1,
}

export type FileToUpload = {
  uri: string;
  type: ContentType;
  name: string;
};
