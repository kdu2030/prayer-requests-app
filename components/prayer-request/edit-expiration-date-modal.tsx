import * as React from "react";
import { Text } from "react-native-paper";

import { formatDate } from "../../helpers/formatting-helpers";
import { useI18N } from "../../hooks/use-i18n";
import { CultureCode } from "../../types/languages";
import { PrayerRequestModel } from "../../types/prayer-request-types";
import { RoundedModal } from "../modals/rounded-modal";

type EditExpirationDateProps = {
  prayerRequest: PrayerRequestModel;
  isOpen: boolean;
  onClose: () => void;
};

export function EditExpirationDateModal({
  isOpen,
  onClose,
  prayerRequest,
}: EditExpirationDateProps) {
  const { translate, i18n } = useI18N();

  return (
    <RoundedModal
      title={translate("prayerRequest.editExpirationDate.label")}
      isOpen={isOpen}
      onClose={onClose}
    >
      <Text variant="bodyLarge">
        {translate("prayerRequest.editExpirationDate.date", {
          date: prayerRequest.expirationDate
            ? formatDate(
                prayerRequest.expirationDate,
                i18n.language as CultureCode,
              )
            : undefined,
        })}
      </Text>
    </RoundedModal>
  );
}
