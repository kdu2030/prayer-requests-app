import * as React from "react";
import { useI18N } from "../../../hooks/use-i18n";
import { View } from "react-native";
import { Foundation } from "@expo/vector-icons";
import { Button, Text } from "react-native-paper";
import { JoinStatus } from "../../../constants/prayer-group-constants";
import { usePrivatePrayerGroupPlaceholder } from "./use-private-prayer-group-placeholder";

import { LoadStatus } from "../../../types/api-response-types";

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
            <Button
              mode="contained"
              onPress={onSubmitJoinRequest}
              loading={submitRequestLoadStatus === LoadStatus.Loading}
            >
              {translate("prayerGroup.joinRequest.submitJoinRequest")}
            </Button>
          ) : (
            <Button mode="contained" disabled={true}>
              {translate("prayerGroup.joinRequest.joinRequestSubmitted")}
            </Button>
          )}
        </View>
      </View>
    </>
  );
};
