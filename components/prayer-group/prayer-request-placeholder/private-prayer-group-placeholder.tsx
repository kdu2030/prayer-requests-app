import { Foundation } from "@expo/vector-icons";
import * as React from "react";
import { View } from "react-native";
import { Button, Text } from "react-native-paper";

import { JoinStatus } from "../../../constants/prayer-group-constants";
import { useI18N } from "../../../hooks/use-i18n";
import { LoadStatus } from "../../../types/api-response-types";
import { PrayerRequestPlaceholderBodyTestIds } from "./tests/test-ids";
import { usePrivatePrayerGroupPlaceholder } from "./use-private-prayer-group-placeholder";

type Props = {
  prayerGroupId: number;
  joinStatus: JoinStatus;
  setUserJoinStatus: (joinStatus: JoinStatus) => void;
};

export const PrivatePrayerGroupPlaceholder: React.FC<Props> = ({
  prayerGroupId,
  joinStatus,
  setUserJoinStatus,
}) => {
  const { translate } = useI18N();
  const { onSubmitJoinRequest, submitRequestLoadStatus } =
    usePrivatePrayerGroupPlaceholder(prayerGroupId, setUserJoinStatus);

  return (
    <>
      <View className="items-center mx-4">
        <Foundation name="lock" size={64} />
        <Text className="mt-5" variant="titleMedium">
          {translate("prayerGroup.joinRequest.label")}
        </Text>

        <View className="mt-5">
          {joinStatus === JoinStatus.NotJoined ? (
            <DismissButton
              mode="contained"
              onPress={onSubmitJoinRequest}
              loading={submitRequestLoadStatus === LoadStatus.Loading}
              testID={
                PrayerRequestPlaceholderBodyTestIds.submitJoinRequestButton
              }
            >
              {translate("prayerGroup.joinRequest.submitJoinRequest")}
            </DismissButton>
          ) : (
            <DismissButton mode="contained" disabled={true}>
              {translate("prayerGroup.joinRequest.joinRequestSubmitted")}
            </DismissButton>
          )}
        </View>
      </View>
    </>
  );
};
