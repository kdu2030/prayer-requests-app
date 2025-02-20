import { useLocalSearchParams } from "expo-router";
import * as React from "react";

import { PrayerGroup } from "../../../../components/prayer-group/prayer-group";

type RouteParams = {
  id: string;
};

const PrayerGroupContainer: React.FC = () => {
  const { id } = useLocalSearchParams<RouteParams>();
  const prayerGroupId = +id;

  return <PrayerGroup prayerGroupId={prayerGroupId} />;
};

export default PrayerGroupContainer;
