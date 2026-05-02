import { Formik } from "formik";
import * as React from "react";
import { View } from "react-native";
import { useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

import { useI18N } from "../../hooks/use-i18n";
import { LoadStatus } from "../../types/api-response-types";
import { TextInput } from "../inputs/text-input";
import { ErrorScreen } from "../layouts/error-screen";
import { SpinnerScreen } from "../layouts/spinner-screen";
import { PrayerGroupSectionHeader } from "../prayer-group/section-header/prayer-group-section-header";
import { PrayerRequestActions } from "./prayer-request-actions";
import { PrayerRequestCard } from "./prayer-request-card";
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
  } = usePrayerRequestPage(prayerRequestId);

  return (
    <Formik initialValues={{}} onSubmit={() => {}}>
      <SafeAreaView
        className="flex flex-1"
        style={{ backgroundColor: theme.colors.background }}
      >
        <PrayerGroupSectionHeader title={""} />

        {prayerRequestLoadStatus === LoadStatus.Loading && (
          <SpinnerScreen
            loadingLabel={translate("prayerRequestPage.loading")}
            showSafeArea={false}
          />
        )}

        {prayerRequestLoadStatus === LoadStatus.Error && (
          <ErrorScreen
            errorLabel={translate("prayerRequestPage.failedToLoad")}
            onRetry={loadPrayerRequest}
            showSafeArea={false}
          />
        )}

        {prayerRequestLoadStatus === LoadStatus.Success && prayerRequest && (
          <PrayerRequestCard
            prayerRequest={prayerRequest}
            onOpenMenu={openPrayerRequestMenu}
            isLikeLoading={isLikeLoading}
            onLikePress={onLikePress}
            onPrayPress={openBookmarkBottomSheet}
            showCreatedUser
          />
        )}

        <View
          className="flex flex-row w-full p-4 mt-auto border-t"
          style={{ borderColor: theme.colors.outline }}
        >
          <View className="w-4/5 mt-auto">
            <TextInput name="comment" label="comment" multiline />
          </View>
        </View>

        <PrayerRequestActions
          isOpen={isPrayerRequestActionsOpen}
          showExtendedActions={showExtendedActions}
          selectedPrayerRequest={prayerRequest}
          onClose={closePrayerRequestActions}
        />
      </SafeAreaView>
    </Formik>
  );
};
