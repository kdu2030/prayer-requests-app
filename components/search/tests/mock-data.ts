import { RawPrayerGroupSummary } from "../../../types/prayer-group-types";

export const mockPrayerGroupSearchResults: RawPrayerGroupSummary[] = [
  {
    id: 1,
    groupName: "Prayer Group 1",
    avatarFile: {
      mediaFileId: 1,
      fileName: "f24303c6-880c-4f31-96dd-c92704172dd7.jpeg",
      fileUrl:
        "https://prayerappfileservices.pythonanywhere.com/static/e1e22c31-d696-42ff-b286-1ab7bd716461.jpeg",
      fileType: 1,
    },
  },
  {
    id: 2,
    groupName: "Prayer Group 2",
    avatarFile: {
      mediaFileId: 4,
      fileName: "80762286-809b-4c1c-8919-c74cc3a140e0.jpeg",
      fileUrl:
        "https://prayerappfileservices.pythonanywhere.com/static/36a668ca-633e-471c-8e80-a272152303ef.jpeg",
      fileType: 1,
    },
  },
  {
    id: 3,
    groupName: "Prayer Group 3",
    avatarFile: {
      mediaFileId: 6,
      fileName: "88facf7d-f673-43ca-81d6-428a2814bf31.png",
      fileUrl:
        "https://prayerappfileservices.pythonanywhere.com/static/55d8f978-d458-4983-a5e0-d5b0acf4bfa8.png",
      fileType: 1,
    },
  },
];
