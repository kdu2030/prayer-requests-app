import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import * as React from "react";
import { View } from "react-native";
import { useTheme } from "react-native-paper";

import { useI18N } from "../../hooks/use-i18n";
import { PrayerRequestModel } from "../../types/prayer-request-types";
import { AppBottomSheet } from "../layouts/app-bottom-sheet";
import { PrayerGroupOptionButton } from "../prayer-group/options/prayer-group-option-button";
import { usePrayerRequestActions } from "./use-prayer-request-actions";

type Props = {
  showExtendedActions: boolean;
  selectedPrayerRequest: PrayerRequestModel | undefined;
  isOpen: boolean;
  onClose: () => void;
  openEditExpirationModal: () => void;
  openDeletePrayerRequestModal: () => void;
};

export const PrayerRequestActions: React.FC<Props> = ({
  selectedPrayerRequest,
  isOpen,
  onClose,
  showExtendedActions,
  openEditExpirationModal,
  openDeletePrayerRequestModal,
}) => {
  const theme = useTheme();
  const { translate } = useI18N();

  const { toggleBookmark, isToggleBookmarkLoading, onEditPrayerRequest } =
    usePrayerRequestActions(onClose, selectedPrayerRequest);

  return (
    <AppBottomSheet isOpen={isOpen} onClose={onClose}>
      <View className="p-4">
        <PrayerGroupOptionButton
          icon={
            <MaterialCommunityIcons
              name="cross"
              size={24}
              color={theme.colors.onSurface}
            />
          }
          label={translate("prayerRequest.actions.prayForRequest")}
          onPress={() => {}}
        />

        <PrayerGroupOptionButton
          icon={
            <MaterialIcons
              name={
                selectedPrayerRequest?.userBookmarkId
                  ? "bookmark"
                  : "bookmark-outline"
              }
              size={24}
              color={theme.colors.onSurface}
            />
          }
          label={
            selectedPrayerRequest?.userBookmarkId
              ? translate("prayerRequest.actions.unsavePrayerRequest")
              : translate("prayerRequest.actions.savePrayerRequest")
          }
          onPress={toggleBookmark}
          isLoading={isToggleBookmarkLoading}
        />

        {showExtendedActions && (
          <>
            <PrayerGroupOptionButton
              icon={
                <MaterialCommunityIcons
                  name="pencil"
                  size={24}
                  color={theme.colors.onSurface}
                />
              }
              onPress={onEditPrayerRequest}
              label={translate("prayerRequest.edit.label")}
            />

            <PrayerGroupOptionButton
              icon={
                <MaterialIcons
                  name="edit-calendar"
                  size={24}
                  color={theme.colors.onSurface}
                />
              }
              label={translate("prayerRequest.editExpirationDate.label")}
              onPress={openEditExpirationModal}
            />

            <PrayerGroupOptionButton
              icon={
                <MaterialCommunityIcons
                  name="trash-can"
                  size={24}
                  color={theme.colors.error}
                />
              }
              label={translate("prayerRequest.deletePrayerRequest.label")}
              labelStyles={{ color: theme.colors.error }}
              onPress={openDeletePrayerRequestModal}
            />
          </>
        )}
      </View>
    </AppBottomSheet>
  );
};
