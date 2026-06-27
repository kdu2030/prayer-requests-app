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
import { usePrayerRequestDetailContext } from "./prayer-request-detail-context";

export const usePrayerRequestActions = (
  onClose: () => void,
  selectedPrayerRequest: PrayerRequestModel | undefined,
) => {
  const { translate } = useI18N();

  const [isToggleBookmarkLoading, setIsToggleBookmarkLoading] =
    React.useState<boolean>(false);

  const { openToaster } = useToasterContext();

  const postPrayerRequestBookmark = usePostPrayerRequestBookmark();
  const deletePrayerRequestBookmark = useDeletePrayerRequestBookmark();

  const { userData } = useApiDataContext();

  const { setPrayerRequest, getPrayerRequestFromStore: getPrayerRequest } =
    usePrayerRequestDetailContext();

  const addPrayerRequestBookmark = async (prayerRequestId: number) => {
    if (!userData?.userId) {
      return;
    }

    const targetPrayerRequest = getPrayerRequest(prayerRequestId);

    if (!targetPrayerRequest) {
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

    setPrayerRequest(prayerRequestId, {
      ...targetPrayerRequest,
      userBookmarkId: response.value.prayerRequestBookmarkId,
    });

    onClose();

    openToaster({
      message: translate("toaster.savePrayerRequest.success"),
      variant: "success",
    });
  };

  const removePrayerRequestBookmark = async (
    prayerRequestBookmarkId: number,
  ) => {
    if (!selectedPrayerRequest?.prayerRequestId) {
      return;
    }

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

    setPrayerRequest(selectedPrayerRequest.prayerRequestId, {
      ...selectedPrayerRequest,
      userBookmarkId: undefined,
    });

    onClose();

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

  const onEditPrayerRequest = () => {
    if (
      !selectedPrayerRequest?.prayerRequestId ||
      !selectedPrayerRequest.prayerGroup?.prayerGroupId
    ) {
      return;
    }

    router.push({
      pathname: "/prayergroup/[id]/prayerrequest/[id]/edit",
      params: {
        id: selectedPrayerRequest.prayerGroup.prayerGroupId,
        id_1: selectedPrayerRequest.prayerRequestId,
      },
    });

    onClose();
  };

  return {
    isToggleBookmarkLoading,
    toggleBookmark,
    onEditPrayerRequest,
  };
};
