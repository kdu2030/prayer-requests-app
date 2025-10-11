import * as React from "react";

import { usePostJoinRequestsSearch } from "../../../api/post-join-requests-search";
import { useI18N } from "../../../hooks/use-i18n";
import { LoadStatus } from "../../../types/api-response-types";
import { JoinRequestModel } from "../../../types/join-request-types";
import { useToasterContext } from "../../toasters/toaster-context";
import { JOIN_REQUEST_SORT_CONFIG } from "./join-request-constants";

export const usePrayerGroupJoinRequests = (prayerGroupId: number) => {
  const { translate } = useI18N();
  const { openToaster } = useToasterContext();

  const [joinRequests, setJoinRequests] = React.useState<JoinRequestModel[]>(
    []
  );
  const [joinRequestLoadStatus, setJoinRequestLoadStatus] =
    React.useState<LoadStatus>(LoadStatus.NotStarted);

  const postJoinRequestsSearch = usePostJoinRequestsSearch();

  const loadJoinRequests = React.useCallback(async () => {
    setJoinRequestLoadStatus(LoadStatus.Loading);

    const response = await postJoinRequestsSearch(
      prayerGroupId,
      JOIN_REQUEST_SORT_CONFIG
    );

    if (response.isError) {
      openToaster({
        message: translate("prayerGroup.joinRequest.unableToLoad"),
        variant: "error",
      });
      setJoinRequestLoadStatus(LoadStatus.Error);

      return;
    }

    setJoinRequests(response.value.joinRequests ?? []);
    setJoinRequestLoadStatus(LoadStatus.Success);
  }, [openToaster, prayerGroupId, postJoinRequestsSearch, translate]);

  React.useEffect(() => {
    loadJoinRequests();
  }, [loadJoinRequests, prayerGroupId]);

  return { joinRequests, joinRequestLoadStatus };
};
