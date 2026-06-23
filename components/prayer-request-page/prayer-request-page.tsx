import { Formik, FormikProps } from "formik";
import * as React from "react";
import { FlatList, View } from "react-native";
import { useTheme } from "react-native-paper";

import { useI18N } from "../../hooks/use-i18n";
import { LoadStatus } from "../../types/api-response-types";
import { DismissButton } from "../inputs/dismiss-button";
import { TextInput } from "../inputs/text-input";
import { PrayerGroupContentContainer } from "../prayer-group/section-header/prayer-group-content-container";
import { EditExpirationDateModal } from "../prayer-request/edit-expiration-date-modal";
import { PrayerRequestActions } from "../prayer-request/prayer-request-actions";
import { PrayerRequestCard } from "../prayer-request/prayer-request-card";
import {
  CommentFormAction,
  PrayerRequestCommentForm,
} from "../prayer-request/prayer-request-types";
import { DeletePrayerRequestCommentModal } from "./delete-prayer-request-comment-modal";
import { PrayerRequestCommentActions } from "./prayer-request-comment-actions";
import { PrayerRequestCommentCard } from "./prayer-request-comment-card";
import { PrayerRequestCommentPlaceholder } from "./prayer-request-comment-placeholder";
import { PrayerRequestPagePlaceholder } from "./prayer-request-page-placeholder";
import { PrayerRequestPageTestIds } from "./tests/test-ids";
import { usePrayerRequestPage } from "./use-prayer-request-page";

type Props = {
  prayerRequestId: number;
  scrollToCommentsOnLoad: boolean;
};

export const PrayerRequestPage: React.FC<Props> = ({
  prayerRequestId,
  scrollToCommentsOnLoad,
}) => {
  const theme = useTheme();
  const { translate } = useI18N();

  const {
    prayerRequest,
    prayerRequestLoadStatus,
    loadPrayerRequest,
    onLikePress,
    isLikeLoading,
    isPrayerRequestActionsOpen,
    openBookmarkBottomSheet,
    showExtendedActions,
    closePrayerRequestActions,
    openPrayerRequestMenu,
    isPostCommentLoading,
    isPrayerCommentActionsOpen,
    onCommentActionsCancel,
    onOpenPrayerRequestCommentActions,
    selectedCommentIndex,
    prayerRequestCommentFormRef,
    onEditPrayerRequestComment,
    onCancelEditComment,
    onSaveCommentPress,
    onDeleteComment,
    onCancelDeleteComment,
    isDeleteCommentModalOpen,
    isDeleteCommentLoading,
    onConfirmDeleteComment,
    prayerRequestCommentListRef,
    scrollToCommentSection,
    onCommentListLayout,
    setCommentPlaceholderPosition,
    isExpirationModalOpen,
    setIsExpirationModalOpen,
    openEditExpirationDateModal,
  } = usePrayerRequestPage(prayerRequestId, scrollToCommentsOnLoad);

  if (prayerRequestLoadStatus !== LoadStatus.Success || !prayerRequest) {
    return (
      <PrayerRequestPagePlaceholder
        prayerRequestLoadStatus={prayerRequestLoadStatus}
        loadPrayerRequest={loadPrayerRequest}
      />
    );
  }

  return (
    <Formik
      initialValues={{ formAction: CommentFormAction.Create }}
      onSubmit={() => {}}
      innerRef={prayerRequestCommentFormRef}
    >
      {({ values, setFieldValue }: FormikProps<PrayerRequestCommentForm>) => (
        <PrayerGroupContentContainer
          title={prayerRequest.prayerGroup?.groupName}
        >
          <View className="flex flex-1">
            <FlatList
              keyboardShouldPersistTaps="handled"
              ListHeaderComponent={
                <PrayerRequestCard
                  prayerRequest={prayerRequest}
                  onOpenMenu={openPrayerRequestMenu}
                  isLikeLoading={isLikeLoading}
                  onLikePress={onLikePress}
                  onPrayPress={openBookmarkBottomSheet}
                  onCommentPress={scrollToCommentSection}
                  showCreatedUser
                  truncateDescription={false}
                />
              }
              data={prayerRequest.comments ?? []}
              renderItem={({ item, index }) => (
                <PrayerRequestCommentCard
                  prayerRequestComment={item}
                  isSelected={index === selectedCommentIndex}
                  onOpenActions={() => onOpenPrayerRequestCommentActions(index)}
                />
              )}
              ListEmptyComponent={
                <PrayerRequestCommentPlaceholder
                  setPlaceholderPosition={setCommentPlaceholderPosition}
                />
              }
              onLayout={onCommentListLayout}
              ref={prayerRequestCommentListRef}
            />

            <View
              className="flex flex-col w-full p-4 mt-auto border-t"
              style={{ borderColor: theme.colors.outline }}
            >
              <View className="w-full pb-2 mt-auto">
                <TextInput
                  name="comment"
                  label={translate("prayerRequest.comment.label")}
                  multiline
                  style={{ maxHeight: 120 }}
                  testID={PrayerRequestPageTestIds.commentField}
                />
              </View>

              <View className="flex flex-row self-end gap-2">
                {values.formAction === CommentFormAction.Edit && (
                  <DismissButton mode="outlined" onPress={onCancelEditComment}>
                    {translate("common.actions.cancel")}
                  </DismissButton>
                )}

                <DismissButton
                  mode="contained"
                  disabled={!values.comment || values.comment.trim().length < 1}
                  loading={isPostCommentLoading}
                  onPress={() => onSaveCommentPress(values, setFieldValue)}
                  testID={PrayerRequestPageTestIds.postCommentButton}
                >
                  {values.formAction === CommentFormAction.Create
                    ? translate("prayerRequest.comment.post")
                    : translate("common.actions.save")}
                </DismissButton>
              </View>
            </View>

            <PrayerRequestActions
              isOpen={isPrayerRequestActionsOpen}
              showExtendedActions={showExtendedActions}
              selectedPrayerRequest={prayerRequest}
              openEditExpirationModal={openEditExpirationDateModal}
              onClose={closePrayerRequestActions}
            />

            <PrayerRequestCommentActions
              isOpen={isPrayerCommentActionsOpen}
              onClose={onCommentActionsCancel}
              onEditComment={onEditPrayerRequestComment}
              onDeleteComment={onDeleteComment}
            />

            <DeletePrayerRequestCommentModal
              isOpen={isDeleteCommentModalOpen}
              isDeleteLoading={isDeleteCommentLoading}
              onClose={onCancelDeleteComment}
              onConfirmDelete={onConfirmDeleteComment}
            />

            <EditExpirationDateModal
              isOpen={isExpirationModalOpen}
              onClose={() => setIsExpirationModalOpen(false)}
              prayerRequest={prayerRequest}
            />
          </View>
        </PrayerGroupContentContainer>
      )}
    </Formik>
  );
};
