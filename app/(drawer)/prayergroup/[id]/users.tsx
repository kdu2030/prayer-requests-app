import { useLocalSearchParams } from "expo-router";
import * as React from "react";

import { PrayerGroupUsers } from "../../../../components/prayer-group/users/prayer-group-users";
import { PrayerGroupRouteParams } from ".";

const PrayerGroupUsersContainer: React.FC = () => {
  const { id } = useLocalSearchParams<PrayerGroupRouteParams>();
  const prayerGroupId = Number.parseInt(id);

  return <PrayerGroupUsers prayerGroupId={prayerGroupId} />;
};

export default PrayerGroupUsersContainer;
