import { Formik, FormikProps } from "formik";
import * as React from "react";
import { FlatList, View } from "react-native";
import { Button, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

import { useI18N } from "../../hooks/use-i18n";
import { LoadStatus } from "../../types/api-response-types";
import { TextInput } from "../inputs/text-input";
import { PrayerGroupSectionHeader } from "../prayer-group/section-header/prayer-group-section-header";
import { PrayerRequestActions } from "../prayer-request/prayer-request-actions";
import { PrayerRequestCard } from "../prayer-request/prayer-request-card";
import {
  CommentFormAction,
  PrayerRequestCommentForm,
} from "../prayer-request/prayer-request-types";
import { DeletePrayerRequestCommentModal } from "./delete-prayer-request-comment-modal";
import { PrayerRequestCommentActions } from "./prayer-request-comment-actions";
import { PrayerRequestCommentCard } from "./prayer-request-comment-card";
import { PrayerRequestPagePlaceholder } from "./prayer-request-page-placeholder";
import { usePrayerRequestPage } from "./use-prayer-request-page";

type Props = {
  prayerRequestId: number;
};

export const PrayerRequestPage: React.FC<Props> = ({ prayerRequestId }) => {
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
    onCancelDelete,
    isDeleteCommentModalOpen,
  } = usePrayerRequestPage(prayerRequestId);

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
        <SafeAreaView
          className="flex flex-1"
          style={{ backgroundColor: theme.colors.background }}
        >
          <View className="flex flex-1">
            <PrayerGroupSectionHeader />

            <FlatList
              ListHeaderComponent={
                <PrayerRequestCard
                  prayerRequest={prayerRequest}
                  onOpenMenu={openPrayerRequestMenu}
                  isLikeLoading={isLikeLoading}
                  onLikePress={onLikePress}
                  onPrayPress={openBookmarkBottomSheet}
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
                />
              </View>

              <View className="flex flex-row self-end gap-2">
                {values.formAction === CommentFormAction.Edit && (
                  <Button mode="outlined" onPress={onCancelEditComment}>
                    {translate("common.actions.cancel")}
                  </Button>
                )}

                <Button
                  mode="contained"
                  disabled={!values.comment || values.comment.trim().length < 1}
                  loading={isPostCommentLoading}
                  onPress={() => onSaveCommentPress(values, setFieldValue)}
                >
                  {values.formAction === CommentFormAction.Create
                    ? translate("prayerRequest.comment.post")
                    : translate("common.actions.save")}
                </Button>
              </View>
            </View>

            <PrayerRequestActions
              isOpen={isPrayerRequestActionsOpen}
              showExtendedActions={showExtendedActions}
              selectedPrayerRequest={prayerRequest}
              onClose={closePrayerRequestActions}
            />

            <PrayerRequestCommentActions
              isOpen={isPrayerCommentActionsOpen}
              onClose={onCommentActionsCancel}
              onEditComment={onEditPrayerRequestComment}
              onDeleteComment={onDeleteComment}
            />

            {isDeleteCommentModalOpen && (
              <DeletePrayerRequestCommentModal onClose={onCancelDelete} />
            )}
          </View>
        </SafeAreaView>
      )}
    </Formik>
  );
};
