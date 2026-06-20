import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { RelativePathString, router } from "expo-router";
import * as React from "react";
import { View } from "react-native";
import { Text, useTheme } from "react-native-paper";

import {
  JoinStatus,
  PrayerGroupRole,
  VisibilityLevel,
} from "../../../constants/prayer-group-constants";
import { formatNumber } from "../../../helpers/formatting-helpers";
import { useI18N } from "../../../hooks/use-i18n";
import { CultureCode } from "../../../types/languages";
import { PrayerGroupDetails } from "../../../types/prayer-group-types";
import { AppBottomSheet } from "../../layouts/app-bottom-sheet";
import { PrayerGroupOptionButton } from "./prayer-group-option-button";
import { PrayerGroupOptionsTestIds } from "./tests/test-ids";

type Props = {
  prayerGroupDetails?: PrayerGroupDetails;
  setShowLeavePrayerGroupModal: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
  onClose: () => void;
};

export const PrayerGroupOptions: React.FC<Props> = ({
  prayerGroupDetails,
  setShowLeavePrayerGroupModal,
  isOpen,
  onClose,
}) => {
  const { translate, i18n } = useI18N();
  const theme = useTheme();
  const isAdmin = prayerGroupDetails?.prayerGroupRole === PrayerGroupRole.Admin;

  const formattedJoinRequestCount = prayerGroupDetails?.joinRequestCount
    ? formatNumber(
        prayerGroupDetails.joinRequestCount,
        i18n.language as CultureCode,
      )
    : undefined;

  const onPressOption = (route: string) => {
    prayerGroupDetails?.prayerGroupId &&
      router.push({
        pathname: route as RelativePathString,
        params: { id: prayerGroupDetails?.prayerGroupId },
      });
  };

  return (
    <AppBottomSheet isOpen={isOpen} onClose={onClose}>
      <View className="p-4">
        <PrayerGroupOptionButton
          label={translate("prayerGroup.options.about")}
          icon={
            <MaterialCommunityIcons
              name="information"
              size={24}
              color={theme.colors.onSurface}
            />
          }
          onPress={() => onPressOption("/(drawer)/prayergroup/[id]/about")}
          testID={PrayerGroupOptionsTestIds.aboutButton}
        />

        {isAdmin && (
          <>
            <PrayerGroupOptionButton
              label={translate("prayerGroup.options.editPrayerGroup")}
              icon={
                <MaterialCommunityIcons
                  name="pencil"
                  size={24}
                  color={theme.colors.onSurface}
                />
              }
              onPress={() => onPressOption("/(drawer)/prayergroup/[id]/edit")}
              testID={PrayerGroupOptionsTestIds.editButton}
            />

            <PrayerGroupOptionButton
              label={translate("prayerGroup.manageUsers.label")}
              icon={
                <MaterialCommunityIcons
                  name="account"
                  size={24}
                  color={theme.colors.onSurface}
                />
              }
              onPress={() => onPressOption("/(drawer)/prayergroup/[id]/users")}
              testID={PrayerGroupOptionsTestIds.manageUsersButton}
            />

            {prayerGroupDetails.visibilityLevel === VisibilityLevel.Private && (
              <PrayerGroupOptionButton
                label={translate("prayerGroup.joinRequest.manage")}
                icon={
                  <MaterialIcons
                    name="manage-accounts"
                    size={24}
                    color={theme.colors.onSurface}
                  />
                }
                onPress={() => {
                  onPressOption("/(drawer)/prayergroup/[id]/join-requests");
                }}
                endAdornment={
                  formattedJoinRequestCount ? (
                    <View
                      className="px-4 rounded-full font-bold"
                      style={{ backgroundColor: theme.colors.primary }}
                      testID={PrayerGroupOptionsTestIds.joinRequestsCount}
                    >
                      <Text variant="bodyLarge" className="text-white">
                        {formattedJoinRequestCount}
                      </Text>
                    </View>
                  ) : null
                }
                testID={PrayerGroupOptionsTestIds.manageJoinRequestsButton}
              />
            )}
          </>
        )}

        {prayerGroupDetails?.userJoinStatus == JoinStatus.Joined && (
          <PrayerGroupOptionButton
            label={translate("prayerGroup.actions.addPrayerRequest")}
            icon={
              <MaterialCommunityIcons
                name="plus"
                size={24}
                color={theme.colors.onSurface}
              />
            }
            onPress={() => {
              onPressOption("/(drawer)/prayergroup/[id]/create");
            }}
          />
        )}

        {prayerGroupDetails?.userJoinStatus == JoinStatus.Joined && (
          <PrayerGroupOptionButton
            label={translate("prayerGroup.actions.leavePrayerGroup")}
            icon={
              <MaterialIcons
                name="person-remove"
                size={24}
                color={theme.colors.error}
              />
            }
            labelStyles={{ color: theme.colors.error }}
            onPress={() => {
              setShowLeavePrayerGroupModal(true);
              onClose();
            }}
            testID={PrayerGroupOptionsTestIds.leavePrayerGroupButton}
          />
        )}
      </View>
    </AppBottomSheet>
  );
};
