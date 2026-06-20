import * as React from "react";

import { usePrayerRequestDetailContext } from "../prayer-request/prayer-request-detail-context";

export function usePrayerRequestEditPage(prayerRequestId: number) {
  const { getPrayerRequestFromStore } = usePrayerRequestDetailContext();

  const initialValues = React.useMemo(() => {
    return getPrayerRequestFromStore(prayerRequestId);
  }, [getPrayerRequestFromStore, prayerRequestId]);

  return {
    initialValues,
  };
}
