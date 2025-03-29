import { PrayerGroupDetails } from "../../../types/prayer-group-types";

export const mockPrayerGroupDetails: PrayerGroupDetails = {
  admins: [
    {
      fullName: "Jim Halpert",
      image: undefined,
      role: undefined,
      userId: 1,
      username: undefined,
    },
  ],
  bannerImageFile: {
    fileName: "1116f806-63cc-4bac-8f9b-00f2e734483f.jpeg",
    fileType: 1,
    mediaFileId: 3,
    url: "https://prayerappfileservices.pythonanywhere.com/static/b35e74e1-ae84-4a84-8dca-33da9c40ca21.jpeg",
  },
  color: "#106d20",
  description: "Prayer Group 2 Description",
  groupName: "Prayer Group 2",
  imageFile: {
    fileName: "80762286-809b-4c1c-8919-c74cc3a140e0.jpeg",
    fileType: 1,
    mediaFileId: 4,
    url: "https://prayerappfileservices.pythonanywhere.com/static/36a668ca-633e-471c-8e80-a272152303ef.jpeg",
  },
  isUserJoined: true,
  prayerGroupId: 2,
  rules: undefined,
  userRole: 1,
};
