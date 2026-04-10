import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { router } from "expo-router";
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
import { usePrayerGroupContext } from "./prayer-group-context";

export const usePrayerRequestActions = (
  setPrayerRequests: React.Dispatch<React.SetStateAction<PrayerRequestModel[]>>,
) => {
  const { translate } = useI18N();

  const prayerRequestActionsRef = React.useRef<BottomSheetMethods>(null);

  const [showExtendedActions, setShowExtendedActions] =
    React.useState<boolean>(false);

  const [selectedPrayerRequest, setSelectedPrayerRequest] = React.useState<
    PrayerRequestModel | undefined
  >();
  const [isToggleBookmarkLoading, setIsToggleBookmarkLoading] =
    React.useState<boolean>(false);

  const { openToaster } = useToasterContext();

  const postPrayerRequestBookmark = usePostPrayerRequestBookmark();
  const deletePrayerRequestBookmark = useDeletePrayerRequestBookmark();

  const { userData } = useApiDataContext();

  const { prayerGroupDetails } = usePrayerGroupContext();

  const openPrayerRequestActions = (
    prayerRequest: PrayerRequestModel,
    showExtended: boolean = false,
  ) => {
    if (!prayerRequestActionsRef.current) {
      return;
    }

    prayerRequestActionsRef.current.snapToIndex(0);
    setSelectedPrayerRequest(prayerRequest);
    setShowExtendedActions(showExtended);
  };

  const closePrayerRequestActions = () => {
    prayerRequestActionsRef.current?.close();
    setSelectedPrayerRequest(undefined);
    setShowExtendedActions(false);
  };

  const addPrayerRequestBookmark = async (prayerRequestId: number) => {
    if (!userData?.userId) {
      return;
    }

    const createRequest: PrayerRequestActionCreateRequest = {
      userId: userData.userId,
      submittedDate: new Date().toISOString(),
    };

    setIsToggleBookmarkLoading(true);

    const response = await postPrayerRequestBookmark(
      prayerRequestId,
      createRequest,
    );

    setIsToggleBookmarkLoading(false);

    if (response.isError) {
      openToaster({
        message: translate("toaster.savePrayerRequest.failure"),
        variant: "error",
      });
      return;
    }

    setPrayerRequests((prayerRequests) => {
      const updatedPrayerRequests = prayerRequests.map((prayerRequest) => {
        if (prayerRequest.prayerRequestId !== prayerRequestId) {
          return prayerRequest;
        }

        return {
          ...prayerRequest,
          userBookmarkId: response.value.prayerRequestBookmarkId,
        };
      });

      return updatedPrayerRequests;
    });

    closePrayerRequestActions();

    openToaster({
      message: translate("toaster.savePrayerRequest.success"),
      variant: "success",
    });
  };

  const removePrayerRequestBookmark = async (
    prayerRequestBookmarkId: number,
  ) => {
    setIsToggleBookmarkLoading(true);

    const response = await deletePrayerRequestBookmark(prayerRequestBookmarkId);

    setIsToggleBookmarkLoading(false);

    if (response.isError) {
      openToaster({
        message: translate("toaster.unsavePrayerRequest.failure"),
        variant: "error",
      });

      return;
    }

    setPrayerRequests((prayerRequests) => {
      const updatedPrayerRequests = prayerRequests.map((prayerRequest) => {
        if (
          prayerRequest.prayerRequestId !==
          selectedPrayerRequest?.prayerRequestId
        ) {
          return prayerRequest;
        }

        return { ...prayerRequest, userBookmarkId: undefined };
      });

      return updatedPrayerRequests;
    });

    closePrayerRequestActions();

    openToaster({
      message: translate("toaster.unsavePrayerRequest.success"),
      variant: "success",
    });
  };

  const toggleBookmark = async () => {
    if (!selectedPrayerRequest?.prayerRequestId) {
      return;
    }

    if (!selectedPrayerRequest.userBookmarkId) {
      await addPrayerRequestBookmark(selectedPrayerRequest.prayerRequestId);
      return;
    }

    await removePrayerRequestBookmark(selectedPrayerRequest.userBookmarkId);
  };

  const navigateToPrayerRequestPage = (prayerRequest: PrayerRequestModel) => {
    if (!prayerGroupDetails?.prayerGroupId || !prayerRequest.prayerRequestId) {
      return;
    }

    router.push({
      pathname: "/prayergroup/[id]/prayerrequest/[id]",
      params: {
        id: prayerGroupDetails.prayerGroupId,
        id_1: prayerRequest.prayerRequestId,
      },
    });
  };

  return {
    selectedPrayerRequest,
    openPrayerRequestActions,
    closePrayerRequestActions,
    prayerRequestActionsRef,
    toggleBookmark,
    isToggleBookmarkLoading,
    setSelectedPrayerRequest,
    showExtendedActions,
    navigateToPrayerRequestPage,
  };
};
