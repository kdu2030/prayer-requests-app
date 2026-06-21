import { Formik } from "formik";
import * as React from "react";
import { Text } from "react-native-paper";

import { useI18N } from "../../hooks/use-i18n";
import { PrayerRequestModel } from "../../types/prayer-request-types";
import { FormikSelect } from "../inputs/formik-select";
import { RoundedModal } from "../modals/rounded-modal";
import { EditExpirationDateForm } from "./prayer-request-types";
import { useEditExpirationDateModal } from "./use-edit-expiration-date-modal";

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
  const { translate } = useI18N();
  const { expirationDateOptions, getUpdatedExpirationDate } =
    useEditExpirationDateModal(prayerRequest);

  return (
    <RoundedModal
      title={translate("prayerRequest.editExpirationDate.label")}
      isOpen={isOpen}
      onClose={onClose}
    >
      <Formik initialValues={{}} onSubmit={() => {}}>
        {({ values }) => (
          <>
            <Text variant="bodyLarge" className="mb-4">
              {translate("prayerRequest.editExpirationDate.date", {
                date: getUpdatedExpirationDate(
                  values as EditExpirationDateForm,
                ),
              })}
            </Text>

            <FormikSelect
              name="timeToLive"
              options={expirationDateOptions}
              label={translate("prayerRequest.editExpirationDate.extendBy")}
            />
          </>
        )}
      </Formik>
    </RoundedModal>
  );
}
