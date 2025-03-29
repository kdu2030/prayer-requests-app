import { UserData } from "../../../types/context/api-data-context-type";
import { MediaFile } from "../../../types/media-file-types";
import { RawPrayerGroupDetails } from "../../../types/prayer-group-types";

export const mockRawPrayerGroupDetails: RawPrayerGroupDetails = {
  admins: [{ fullName: "Jim Halpert", id: 1 }],
  bannerImageFile: {
    fileName: "1116f806-63cc-4bac-8f9b-00f2e734483f.jpeg",
    fileType: 1,
    id: 3,
    url: "https://prayerappfileservices.pythonanywhere.com/static/b35e74e1-ae84-4a84-8dca-33da9c40ca21.jpeg",
  },
  color: "#106d20",
  description: "Prayer Group 2 Description",
  groupName: "Prayer Group 2",
  id: 2,
  imageFile: {
    fileName: "80762286-809b-4c1c-8919-c74cc3a140e0.jpeg",
    fileType: 1,
    id: 4,
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
