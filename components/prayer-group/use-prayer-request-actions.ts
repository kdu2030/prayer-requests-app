import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import * as React from "react";

import { useDeletePrayerRequestBookmark } from "../../api/delete-prayer-request-bookmark";
import { usePostPrayerRequestBookmark } from "../../api/post-prayer-request-bookmark";
import { useApiDataContext } from "../../hooks/use-api-data";
import { useI18N } from "../../hooks/use-i18n";
import {
  PrayerRequestActionCreateRequest,
  PrayerRequestModel,
} from "../../types/prayer-request-types";
import { useToasterContext } from "../toasters/toaster-context";

export const usePrayerRequestActions = () => {
  const { translate } = useI18N();

  const prayerRequestActionsRef = React.useRef<BottomSheetMethods>(null);
  const [selectedPrayerRequest, setSelectedPrayerRequest] = React.useState<
    PrayerRequestModel | undefined
  >();
  const [isToggleBookmarkLoading, setIsToggleBookmarkLoading] =
    React.useState<boolean>(false);

  const { openToaster } = useToasterContext();

  const postPrayerRequestBookmark = usePostPrayerRequestBookmark();
  const deletePrayerRequestBookmark = useDeletePrayerRequestBookmark();

  const { userData } = useApiDataContext();

  const openPrayerRequestActions = (prayerRequest: PrayerRequestModel) => {
    if (!prayerRequestActionsRef.current) {
      return;
    }

    prayerRequestActionsRef.current.snapToIndex(0);
    setSelectedPrayerRequest(prayerRequest);
  };

  const closePrayerRequestActions = () => {
    prayerRequestActionsRef.current?.close();
    setSelectedPrayerRequest(undefined);
  };

  const addPrayerRequestBookmark = async (prayerRequestId: number) => {
    if (!userData?.userId) {
      return;
    }

    const createRequest: PrayerRequestActionCreateRequest = {
      userId: userData.userId,
      submittedDate: new Date().toISOString(),
    };

    const response = await postPrayerRequestBookmark(
      prayerRequestId,
      createRequest,
    );

    if (response.isError) {
      openToaster({
        message: translate("toaster.savePrayerRequest.failure"),
        variant: "error",
      });
      return;
    }

    closePrayerRequestActions();

    openToaster({
      message: translate("toaster.savePrayerRequest.success"),
      variant: "error",
    });
  };

  const toggleBookmark = async () => {
    if (!selectedPrayerRequest?.prayerRequestId) {
      return;
    }
  };

  return {
    selectedPrayerRequest,
    openPrayerRequestActions,
    closePrayerRequestActions,
    prayerRequestActionsRef,
  };
};
