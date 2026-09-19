import * as React from "react";

import { NoGroupsPlaceholder } from "./no-groups-placeholder";
import { NoRecentPostsPlaceholder } from "./no-recent-posts-placeholder";
import { useUserHomePageBody } from "./use-user-home-page-body";

export const UserHomePageBody: React.FC = () => {
  const { joinedNoPrayerGroups, loadedPrayerRequests } = useUserHomePageBody();

  return (
    <>
      {joinedNoPrayerGroups && <NoGroupsPlaceholder />}
      {loadedPrayerRequests.length === 0 && <NoRecentPostsPlaceholder />}
    </>
  );
};
