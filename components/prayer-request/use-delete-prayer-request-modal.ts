import * as React from "react";

import { useDeletePrayerRequest } from "../../api/delete-prayer-request";
import { useI18N } from "../../hooks/use-i18n";
import { useToasterContext } from "../toasters/toaster-context";
import { usePrayerRequestDetailContext } from "./prayer-request-detail-context";

export function useDeletePrayerRequestModal(
  prayerRequestIdToDelete: number | undefined,
  onClose: () => void,
  onDeleteSuccess?: (deletedPrayerRequestId: number) => void,
) {
  const { translate } = useI18N();

  const deletePrayerRequest = useDeletePrayerRequest();
  const { openToaster } = useToasterContext();

  const { setPrayerRequest } = usePrayerRequestDetailContext();

  const [isDeleteLoading, setIsDeleteLoading] = React.useState<boolean>(false);

  async function onDeletePrayerRequest() {
    if (!prayerRequestIdToDelete) {
      return;
    }

    setIsDeleteLoading(true);
    const response = await deletePrayerRequest(prayerRequestIdToDelete);
    setIsDeleteLoading(false);

    if (response.isError) {
      openToaster({
        variant: "error",
        message: translate("toaster.deletePrayerRequest.failure"),
      });
      return;
    }

    openToaster({
      variant: "success",
      message: translate("toaster.deletePrayerRequest.success"),
    });

    onClose();

    onDeleteSuccess?.(prayerRequestIdToDelete);
    setPrayerRequest(prayerRequestIdToDelete, undefined);
  }

  return {
    isDeleteLoading,
    onDeletePrayerRequest,
  };
}
