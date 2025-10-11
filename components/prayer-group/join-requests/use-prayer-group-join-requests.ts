import * as React from "react";

import { usePostJoinRequestsSearch } from "../../../api/post-join-requests-search";
import { useI18N } from "../../../hooks/use-i18n";
import { JoinRequestModel } from "../../../types/join-request-types";
import { useToasterContext } from "../../toasters/toaster-context";
import { JOIN_REQUEST_SORT_CONFIG } from "./join-request-constants";

export const usePrayerGroupJoinRequests = (prayerGroupId: number) => {
  const { translate } = useI18N();
  const { openToaster } = useToasterContext();

  const [joinRequests, setJoinRequests] = React.useState<JoinRequestModel[]>(
    []
  );
  const postJoinRequestsSearch = usePostJoinRequestsSearch();

  const loadJoinRequests = React.useCallback(async () => {
    const response = await postJoinRequestsSearch(
      prayerGroupId,
      JOIN_REQUEST_SORT_CONFIG
    );

    if (response.isError) {
      openToaster({
        message: translate("prayerGroup.joinRequest.unableToLoad"),
        variant: "error",
      });
      return;
    }

    setJoinRequests(response.value.joinRequests ?? []);
  }, [openToaster, prayerGroupId, postJoinRequestsSearch, translate]);

  React.useEffect(() => {
    loadJoinRequests();
  }, [loadJoinRequests, prayerGroupId]);

  return { joinRequests };
};
