import * as React from "react";

import { useGetPrayerRequest } from "../../api/get-prayer-request";
import { LoadStatus } from "../../types/api-response-types";
import { PrayerRequestModel } from "../../types/prayer-request-types";

export const usePrayerRequestPage = (prayerRequestId: number) => {
  const [prayerRequest, setPrayerRequest] =
    React.useState<PrayerRequestModel>();
  const [prayerRequestLoadStatus, setPrayerRequestLoadStatus] =
    React.useState<LoadStatus>(LoadStatus.NotStarted);

  const getPrayerRequest = useGetPrayerRequest();

  const loadPrayerRequest = React.useCallback(async () => {
    setPrayerRequestLoadStatus(LoadStatus.Loading);
    const prayerRequestResponse = await getPrayerRequest(prayerRequestId);

    if (prayerRequestResponse.isError) {
      setPrayerRequestLoadStatus(LoadStatus.Error);
      return;
    }

    setPrayerRequest(prayerRequestResponse.value);
    setPrayerRequestLoadStatus(LoadStatus.Success);
  }, [getPrayerRequest, prayerRequestId]);

  React.useEffect(() => {
    loadPrayerRequest();
  }, [loadPrayerRequest]);

  return {
    prayerRequest,
    prayerRequestLoadStatus,
    loadPrayerRequest,
  };
};
