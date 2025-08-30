import { PrayerGroupRole } from "../../../../constants/prayer-group-constants";
import { RawPrayerGroupUserSummary } from "../../../../types/prayer-group-types";

export const mockRawPrayerGroupUsers: RawPrayerGroupUserSummary[] = [
  {
    fullName: "Jim Halpert",
    userId: 1,
    prayerGroupRole: PrayerGroupRole.Admin,
    username: "jhalpert",
  },
  {
    fullName: "Dwight Schrute",
    userId: 2,
    prayerGroupRole: PrayerGroupRole.Member,
    username: "dschrute",
  },
  {
    fullName: "Michael Scott",
    userId: 3,
    prayerGroupRole: PrayerGroupRole.Member,
    username: "mscott",
  },
];
