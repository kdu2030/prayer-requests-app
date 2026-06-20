import { useLocalSearchParams } from "expo-router";
import * as React from "react";

import { PrayerRequestEditPage } from "../../../../../../components/prayer-request-page/prayer-request-edit-page";

type PrayerRequestPageParams = {
  id: string;
  id_1: string;
};

function PrayerRequestEditContainer() {
  const { id, id_1 } = useLocalSearchParams<PrayerRequestPageParams>();

  const prayerGroupId = Number.parseInt(id);
  const prayerRequestId = Number.parseInt(id_1);

  return (
    <PrayerRequestEditPage
      prayerRequestId={prayerRequestId}
      prayerGroupId={prayerGroupId}
    />
  );
}

export default PrayerRequestEditContainer;
