import { router } from "expo-router";
import * as React from "react";
import { TextInput } from "react-native";

import {
  PutPrayerRequestBody,
  usePutPrayerRequest,
} from "../../api/put-prayer-request";
import { useI18N } from "../../hooks/use-i18n";
import { CreatePrayerRequestForm } from "../prayer-group/create-prayer-request/create-prayer-request-types";
import { usePrayerRequestDetailContext } from "../prayer-request/prayer-request-detail-context";
import { useToasterContext } from "../toasters/toaster-context";

export function usePrayerRequestEditPage(prayerRequestId: number) {
  const { getPrayerRequestFromStore, setPrayerRequest } =
    usePrayerRequestDetailContext();

  const { openToaster } = useToasterContext();

  const { translate } = useI18N();

  const requestDescriptionRef = React.useRef<TextInput>(null);

  const putPrayerRequest = usePutPrayerRequest();

  const [isEditLoading, setIsEditLoading] = React.useState<boolean>(false);

  const [isInitialFocusComplete, setIsInitialFocusComplete] =
    React.useState<boolean>(false);

  const initialValues = React.useMemo(() => {
    return getPrayerRequestFromStore(prayerRequestId);
  }, [getPrayerRequestFromStore, prayerRequestId]);

  React.useEffect(() => {
    if (!requestDescriptionRef.current) {
      return;
    }

    requestDescriptionRef.current.focus();
    setIsInitialFocusComplete(true);
  }, [isInitialFocusComplete]);

  async function saveEditPrayerRequest(
    editPrayerRequestValues: CreatePrayerRequestForm,
  ) {
    setIsEditLoading(true);

    const putRequestBody: PutPrayerRequestBody = {
      requestTitle: editPrayerRequestValues.requestTitle ?? "",
      requestDescription: editPrayerRequestValues.requestDescription ?? "",
      expirationDate: initialValues?.expirationDate,
    };

    const response = await putPrayerRequest(prayerRequestId, putRequestBody);
    setIsEditLoading(false);

    if (response.isError) {
      openToaster({
        variant: "error",
        message: translate("toaster.editPrayerRequest.failure"),
      });
      return;
    }

    setPrayerRequest(prayerRequestId, { ...initialValues, ...response.value });
    openToaster({
      variant: "success",
      message: translate("toaster.editPrayerRequest.success"),
    });

    router.back();
  }

  return {
    initialValues,
    requestDescriptionRef,
    saveEditPrayerRequest,
    isEditLoading,
  };
}
