import { useLocalSearchParams } from "expo-router";
import * as React from "react";

import { PrayerGroup } from "../../../../components/prayer-group/prayer-group";

export type PrayerGroupRouteParams = {
  id: string;
};

const PrayerGroupContainer: React.FC = () => {
  const { id } = useLocalSearchParams<PrayerGroupRouteParams>();
  const prayerGroupId = +id;

  return <PrayerGroup prayerGroupId={prayerGroupId} />;
};

export default PrayerGroupContainer;
