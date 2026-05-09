import { useLocalSearchParams } from "expo-router";
import * as React from "react";

import { PrayerRequestPage } from "../../../../../components/prayer-request-page/prayer-request-page";

type PrayerRequestPageParams = {
  id: string;
  id_1: string;
};

const PrayerRequestContainer: React.FC = () => {
  const { id_1 } = useLocalSearchParams<PrayerRequestPageParams>();
  const prayerRequestId = React.useMemo(() => {
    if (typeof id_1 === "string") {
      return Number.parseInt(id_1);
    }

    return Number.parseInt(id_1[0]);
  }, [id_1]);

  return (
    <>
      <PrayerRequestPage prayerRequestId={prayerRequestId} />
    </>
  );
};

export default PrayerRequestContainer;
