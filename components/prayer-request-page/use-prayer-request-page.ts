import { FormikProps } from "formik";
import * as React from "react";
import { Keyboard } from "react-native";

import { useDeletePrayerRequestLike } from "../../api/delete-prayer-request-like";
import { useGetPrayerRequest } from "../../api/get-prayer-request";
import { usePostPrayerRequestComment } from "../../api/post-prayer-request-comment";
import { usePostPrayerRequestLike } from "../../api/post-prayer-request-like";
import {
  PutPrayerRequestCommentRequest,
  usePutPrayerRequestComment,
} from "../../api/put-prayer-request-comment";
import { useApiDataContext } from "../../hooks/use-api-data";
import { useI18N } from "../../hooks/use-i18n";
import { LoadStatus } from "../../types/api-response-types";
import {
  PrayerRequestDetailsModel,
  PrayerRequestModel,
} from "../../types/prayer-request-types";
import { usePrayerRequestActionsContainer } from "../prayer-group/use-prayer-request-actions-container";
import { usePrayerRequestDetailContext } from "../prayer-request/prayer-request-detail-context";
import {
  CommentFormAction,
  PrayerRequestCommentForm,
} from "../prayer-request/prayer-request-types";
import { useToasterContext } from "../toasters/toaster-context";

export const usePrayerRequestPage = (prayerRequestId: number) => {
  const [prayerRequest, setPrayerRequest] =
    React.useState<PrayerRequestDetailsModel>();
  const [prayerRequestLoadStatus, setPrayerRequestLoadStatus] =
    React.useState<LoadStatus>(LoadStatus.NotStarted);

  const [isLikeLoading, setIsLikeLoading] = React.useState<boolean>(false);
  const [isPostCommentLoading, setIsPostCommentLoading] =
    React.useState<boolean>(false);

  const [isPrayerCommentActionsOpen, setIsPrayerCommentActionsOpen] =
    React.useState<boolean>(false);
  const [selectedCommentIndex, setSelectedCommentIndex] =
    React.useState<number>();

  const {
    openPrayerRequestActions,
    showExtendedActions,
    isPrayerRequestActionsOpen,
    closePrayerRequestActions,
  } = usePrayerRequestActionsContainer();

  const { userData } = useApiDataContext();
  const { translate } = useI18N();
  const { openToaster } = useToasterContext();

  const getPrayerRequest = useGetPrayerRequest();

  const postPrayerRequestLike = usePostPrayerRequestLike();
  const deletePrayerRequestLike = useDeletePrayerRequestLike();

  const postPrayerRequestComment = usePostPrayerRequestComment();
  const putPrayerRequestComment = usePutPrayerRequestComment();

  const {
    setPrayerRequest: setPrayerRequestGlobal,
    getPrayerRequestFromStore,
  } = usePrayerRequestDetailContext();

  const storedPrayerRequest = getPrayerRequestFromStore(prayerRequestId);

  const prayerRequestCommentFormRef =
    React.useRef<FormikProps<PrayerRequestCommentForm>>(null);

  const isCommentActionInProgressRef = React.useRef<boolean>(false);

  const loadPrayerRequest = async () => {
    setPrayerRequestLoadStatus(LoadStatus.Loading);
    const prayerRequestResponse = await getPrayerRequest(prayerRequestId);

    if (prayerRequestResponse.isError) {
      setPrayerRequestLoadStatus(LoadStatus.Error);
      return;
    }

    setPrayerRequest(prayerRequestResponse.value);
    setPrayerRequestGlobal(prayerRequestId, prayerRequestResponse.value);

    setPrayerRequestLoadStatus(LoadStatus.Success);
  };

  React.useEffect(() => {
    loadPrayerRequest();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addPrayerRequestLike = async () => {
    if (!prayerRequest?.prayerRequestId || !userData?.userId) {
      return;
    }

    setIsLikeLoading(true);
    const response = await postPrayerRequestLike(
      prayerRequest.prayerRequestId,
      {
        userId: userData.userId,
        submittedDate: new Date().toISOString(),
      },
    );
    setIsLikeLoading(false);

    if (response.isError) {
      openToaster({
        message: translate("prayerRequest.addLike.failure"),
        variant: "error",
      });
      return;
    }

    const updatedPrayerRequest: PrayerRequestModel = {
      ...prayerRequest,
      likeCount: (prayerRequest.likeCount ?? 0) + 1,
      userLikeId: response.value.prayerRequestLikeId,
    };

    setPrayerRequest(updatedPrayerRequest);
    setPrayerRequestGlobal(prayerRequestId, updatedPrayerRequest);
  };

  const removePrayerRequestLike = async () => {
    if (!prayerRequest?.userLikeId) {
      return;
    }

    setIsLikeLoading(true);
    const response = await deletePrayerRequestLike(prayerRequest.userLikeId);
    setIsLikeLoading(false);

    if (response.isError) {
      openToaster({
        message: translate("prayerRequest.removeLike.failure"),
        variant: "error",
      });
      return;
    }

    const updatedPrayerRequest: PrayerRequestDetailsModel = {
      ...prayerRequest,
      likeCount: prayerRequest.likeCount
        ? prayerRequest.likeCount - 1
        : undefined,
      userLikeId: undefined,
    };

    setPrayerRequest(updatedPrayerRequest);
    setPrayerRequestGlobal(prayerRequestId, updatedPrayerRequest);
  };

  const onLikePress = async () => {
    if (!prayerRequest) {
      return;
    }

    if (!prayerRequest.userLikeId) {
      await addPrayerRequestLike();
      return;
    }

    await removePrayerRequestLike();
  };

  const openBookmarkBottomSheet = () => {
    if (!prayerRequest) {
      return;
    }

    openPrayerRequestActions(prayerRequest, false);
  };

  const openPrayerRequestMenu = () => {
    if (!prayerRequest) {
      return;
    }

    openPrayerRequestActions(prayerRequest, true);
  };

  React.useEffect(() => {
    setPrayerRequest((prayerRequest) => {
      if (!prayerRequest) {
        return;
      }

      return {
        ...storedPrayerRequest,
        comments: prayerRequest.comments,
      };
    });
  }, [storedPrayerRequest]);

  const onPostCommentPress = async (
    values: PrayerRequestCommentForm,
    setFieldValue: (field: string, value: any) => void,
  ) => {
    if (!userData?.userId) {
      return;
    }

    if (!values.comment || values.comment.trim().length < 1) {
      return;
    }

    Keyboard.dismiss();

    setIsPostCommentLoading(true);

    const response = await postPrayerRequestComment(prayerRequestId, {
      comment: values.comment,
      userId: userData.userId,
      submittedDate: new Date().toISOString(),
    });

    setIsPostCommentLoading(false);

    if (response.isError) {
      openToaster({
        message: translate("toaster.comment.failure"),
        variant: "error",
      });

      return;
    }

    openToaster({
      message: translate("toaster.comment.success"),
      variant: "success",
    });

    setFieldValue("comment", undefined);

    const newComment = response.value;
    const currentUserCommentIds = prayerRequest?.userCommentIds ?? [];

    const prayerRequestComments = prayerRequest?.comments ?? [];
    prayerRequestComments.unshift(newComment);

    const updatedPrayerRequest: PrayerRequestDetailsModel = {
      ...prayerRequest,
      comments: prayerRequestComments,
      userCommentIds: newComment.prayerRequestCommentId
        ? currentUserCommentIds.concat(newComment.prayerRequestCommentId)
        : currentUserCommentIds,
      commentCount: (prayerRequest?.commentCount ?? 0) + 1,
    };

    setPrayerRequest(updatedPrayerRequest);
    setPrayerRequestGlobal(prayerRequestId, updatedPrayerRequest);
  };

  const onEditCommentPress = async (values: PrayerRequestCommentForm) => {
    if (!prayerRequest?.comments || selectedCommentIndex == null) {
      return;
    }

    const targetComment = prayerRequest.comments[selectedCommentIndex];

    if (!targetComment?.prayerRequestCommentId) {
      return;
    }

    const putCommentRequest: PutPrayerRequestCommentRequest = {
      comment: values.comment ?? "",
    };

    setIsPostCommentLoading(true);
    const response = await putPrayerRequestComment(
      targetComment.prayerRequestCommentId,
      putCommentRequest,
    );
    setIsPostCommentLoading(false);

    if (response.isError) {
      openToaster({
        variant: "error",
        message: translate("toaster.editComment.failure"),
      });
      return;
    }

    openToaster({
      variant: "success",
      message: translate("toaster.editComment.success"),
    });

    prayerRequestCommentFormRef.current?.resetForm({
      values: { formAction: CommentFormAction.Create },
    });

    setSelectedCommentIndex(undefined);
    isCommentActionInProgressRef.current = false;
  };

  const onSaveCommentPress = (
    values: PrayerRequestCommentForm,
    setFieldValue: (field: string, value: any) => void,
  ) => {
    if (values.formAction === CommentFormAction.Create) {
      onPostCommentPress(values, setFieldValue);
    } else {
      onEditCommentPress(values);
    }
  };

  const onCommentActionsCancel = () => {
    setIsPrayerCommentActionsOpen(false);

    if (!isCommentActionInProgressRef.current) {
      setSelectedCommentIndex(undefined);
    }
  };

  const onOpenPrayerRequestCommentActions = (commentIndex: number) => {
    setSelectedCommentIndex(commentIndex);
    setIsPrayerCommentActionsOpen(true);
  };

  const onEditPrayerRequestComment = () => {
    if (!prayerRequest?.comments || selectedCommentIndex == null) {
      return;
    }

    if (!prayerRequestCommentFormRef.current) {
      return;
    }

    const { resetForm } = prayerRequestCommentFormRef.current;

    const targetComment = prayerRequest.comments[selectedCommentIndex];

    resetForm({
      values: {
        comment: targetComment.comment,
        formAction: CommentFormAction.Edit,
      },
    });
    isCommentActionInProgressRef.current = true;

    setIsPrayerCommentActionsOpen(false);
  };

  const onCancelEditComment = () => {
    if (!prayerRequestCommentFormRef.current) {
      return;
    }

    const { resetForm } = prayerRequestCommentFormRef.current;

    setSelectedCommentIndex(undefined);
    resetForm({ values: { formAction: CommentFormAction.Create } });
    isCommentActionInProgressRef.current = false;
  };

  return {
    prayerRequest,
    prayerRequestLoadStatus,
    loadPrayerRequest,
    onLikePress,
    isLikeLoading,
    showExtendedActions,
    isPrayerRequestActionsOpen,
    closePrayerRequestActions,
    openBookmarkBottomSheet,
    openPrayerRequestMenu,
    isPostCommentLoading,
    onPostCommentPress,
    isPrayerCommentActionsOpen,
    onCommentActionsCancel,
    selectedCommentIndex,
    onOpenPrayerRequestCommentActions,
    prayerRequestCommentFormRef,
    onEditPrayerRequestComment,
    onCancelEditComment,
    onSaveCommentPress,
  };
};
