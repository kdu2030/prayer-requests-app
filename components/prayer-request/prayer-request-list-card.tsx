import { MaterialIcons } from "@expo/vector-icons";
import * as React from "react";
import { View } from "react-native";
import { Button, Text, TouchableRipple, useTheme } from "react-native-paper";

import { formatDate, formatNumber } from "../../helpers/formatting-helpers";
import { getArrayTestId } from "../../helpers/utils";
import { useI18N } from "../../hooks/use-i18n";
import { CultureCode } from "../../types/languages";
import { PrayerRequestModel } from "../../types/prayer-request-types";
import { ProfilePicture } from "../layouts/profile-picture";
import { PrayerRequestCard } from "./prayer-request-card";
import { PrayerRequestCardTestIds } from "./tests/test-ids";
import { usePrayerRequestListCard } from "./use-prayer-request-list-card";

type Props = {
  prayerRequest: PrayerRequestModel;
  prayerRequests: PrayerRequestModel[];
  setPrayerRequests: React.Dispatch<React.SetStateAction<PrayerRequestModel[]>>;
  openPrayerRequestActions: (
    prayerRequest: PrayerRequestModel,
    showExtendedOptions?: boolean,
  ) => void;
  showCreatedUser?: boolean;
};

export const PrayerRequestListCard: React.FC<Props> = ({
  prayerRequest,
  prayerRequests,
  setPrayerRequests,
  showCreatedUser = true,
  openPrayerRequestActions,
}) => {
  const theme = useTheme();
  const { i18n } = useI18N();
  const displayUser = showCreatedUser && prayerRequest.user?.fullName;

  const { isLikeLoading, onLikePress, likeIcon } = usePrayerRequestListCard(
    prayerRequest,
    prayerRequests,
    setPrayerRequests,
  );

  return (
    <PrayerRequestCard
      prayerRequest={prayerRequest}
      onOpenMenu={() => openPrayerRequestActions(prayerRequest, true)}
      isLikeLoading={isLikeLoading}
      onLikePress={onLikePress}
      onPrayPress={() => openPrayerRequestActions(prayerRequest, false)}
      showCreatedUser={showCreatedUser}
    />
  );
};
