import { UserData } from "../../../types/context/api-data-context-type";
import { MediaFile } from "../../../types/media-file-types";
import {
  PrayerGroupDetails,
  RawPrayerGroupDetails,
} from "../../../types/prayer-group-types";
import { RawPrayerRequestModel } from "../../../types/prayer-request-types";

export const mockRawPrayerGroupDetails: RawPrayerGroupDetails = {
  admins: [{ fullName: "Jim Halpert", userId: 1 }],
  bannerFile: {
    fileName: "1116f806-63cc-4bac-8f9b-00f2e734483f.jpeg",
    fileType: 1,
    id: 3,
    url: "https://prayerappfileservices.pythonanywhere.com/static/b35e74e1-ae84-4a84-8dca-33da9c40ca21.jpeg",
  },
  color: "#106d20",
  description: "Prayer Group 2 Description",
  groupName: "Prayer Group 2",
  prayerGroupId: 2,
  avatarFile: {
    fileName: "80762286-809b-4c1c-8919-c74cc3a140e0.jpeg",
    fileType: 1,
    id: 4,
    url: "https://prayerappfileservices.pythonanywhere.com/static/36a668ca-633e-471c-8e80-a272152303ef.jpeg",
  },
  isUserJoined: true,
  userRole: 1,
};

export const mockPrayerGroupDetails: PrayerGroupDetails = {
  admins: [{ fullName: "Jim Halpert", userId: 1 }],
  bannerImageFile: {
    fileName: "1116f806-63cc-4bac-8f9b-00f2e734483f.jpeg",
    fileType: 1,
    mediaFileId: 3,
    url: "https://prayerappfileservices.pythonanywhere.com/static/b35e74e1-ae84-4a84-8dca-33da9c40ca21.jpeg",
  },
  color: "#106d20",
  description: "Prayer Group 2 Description",
  groupName: "Prayer Group 2",
  prayerGroupId: 2,
  avatarFile: {
    fileName: "80762286-809b-4c1c-8919-c74cc3a140e0.jpeg",
    fileType: 1,
    mediaFileId: 4,
    url: "https://prayerappfileservices.pythonanywhere.com/static/36a668ca-633e-471c-8e80-a272152303ef.jpeg",
  },
  isUserJoined: true,
  userRole: 1,
};

export const mockUserData: UserData = {
  email: "jhalpert@dundermifflin.com",
  fullName: "Jim Halpert",
  image: undefined,
  prayerGroups: [
    { groupName: "Prayer Group 1", prayerGroupId: 1 },
    { groupName: "Prayer Group 2", prayerGroupId: 2 },
  ],
  userId: 1,
  username: "jhalpert",
};

export const mockMediaFile: MediaFile = {
  fileName: "80762286-809b-4c1c-8919-c74cc3a140e0.jpeg",
  fileType: 1,
  mediaFileId: 4,
  url: "https://prayerappfileservices.pythonanywhere.com/static/36a668ca-633e-471c-8e80-a272152303ef.jpeg",
};

export const mockPrayerRequests: RawPrayerRequestModel[] = [
  {
    id: 9,
    requestTitle: "Test",
    requestDescription: "Test",
    createdDate: "2025-07-04T01:11:35.907537Z",
    prayerGroup: {
      id: 1,
      groupName: "Grace Christian Fellowship",
      avatarFile: {
        id: 2,
        fileName: "6c8eb229-ab1f-4adf-a444-aac434c12619.jpeg",
        url: "https://prayerappfileservices.pythonanywhere.com/static/c16e92f9-3c43-42ab-a214-a9230cad3f10.jpeg",
        fileType: 1,
      },
    },
    user: {
      userId: 1,
      username: "jhalpert",
      fullName: "Jim Halpert",
    },
    likeCount: 1,
    commentCount: 0,
    prayedCount: 0,
    expirationDate: "2025-07-19T01:11:26.271Z",
    isUserLiked: false,
    isUserCommented: false,
  },
  {
    id: 8,
    requestTitle: "Prayer Request 7",
    requestDescription: "Prayer Request 7",
    createdDate: "2025-07-04T01:07:01.975895Z",
    prayerGroup: {
      id: 1,
      groupName: "Grace Christian Fellowship",
      avatarFile: {
        id: 2,
        fileName: "6c8eb229-ab1f-4adf-a444-aac434c12619.jpeg",
        url: "https://prayerappfileservices.pythonanywhere.com/static/c16e92f9-3c43-42ab-a214-a9230cad3f10.jpeg",
        fileType: 1,
      },
    },
    user: {
      userId: 1,
      username: "jhalpert",
      fullName: "Jim Halpert",
    },
    likeCount: 1,
    commentCount: 0,
    prayedCount: 0,
    expirationDate: "2025-07-19T01:06:51.026Z",
    isUserLiked: true,
    isUserCommented: false,
  },
  {
    id: 7,
    requestTitle: "Prayer Request 6",
    requestDescription: "Prayer request 7",
    createdDate: "2025-06-29T19:58:27.283659Z",
    prayerGroup: {
      id: 1,
      groupName: "Grace Christian Fellowship",
      avatarFile: {
        id: 2,
        fileName: "6c8eb229-ab1f-4adf-a444-aac434c12619.jpeg",
        url: "https://prayerappfileservices.pythonanywhere.com/static/c16e92f9-3c43-42ab-a214-a9230cad3f10.jpeg",
        fileType: 1,
      },
    },
    user: {
      userId: 1,
      username: "jhalpert",
      fullName: "Jim Halpert",
    },
    likeCount: 0,
    commentCount: 0,
    prayedCount: 0,
    expirationDate: "2025-07-14T19:58:29.314Z",
    isUserLiked: false,
    isUserCommented: false,
  },
];
