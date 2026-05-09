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
import { PrayerRequestCommentForm } from "../prayer-request/prayer-request-types";
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
    onPostCommentPress,
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
    <Formik initialValues={{}} onSubmit={() => {}}>
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
              data={[]}
              renderItem={() => <></>}
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

              <Button
                className="self-end"
                mode="contained"
                disabled={!values.comment || values.comment.trim().length < 1}
                loading={isPostCommentLoading}
                onPress={() => onPostCommentPress(values, setFieldValue)}
              >
                {translate("prayerRequest.comment.post")}
              </Button>
            </View>

            <PrayerRequestActions
              isOpen={isPrayerRequestActionsOpen}
              showExtendedActions={showExtendedActions}
              selectedPrayerRequest={prayerRequest}
              onClose={closePrayerRequestActions}
            />
          </View>
        </SafeAreaView>
      )}
    </Formik>
  );
};
