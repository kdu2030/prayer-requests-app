import { useLocalSearchParams } from "expo-router";
import * as React from "react";

import { PrayerGroupJoinRequests } from "../../../../components/prayer-group/join-requests/prayer-group-join-requests";
import { PrayerGroupRouteParams } from ".";

const JoinRequestsContainer: React.FC = () => {
  const { id } = useLocalSearchParams<PrayerGroupRouteParams>();
  const prayerGroupId = Number.parseInt(id);

  return <PrayerGroupJoinRequests prayerGroupId={prayerGroupId} />;
};

export default JoinRequestsContainer;
