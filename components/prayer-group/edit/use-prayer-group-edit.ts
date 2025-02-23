import { FormikProps } from "formik";
import * as React from "react";

import { PrayerGroupDetails } from "../../../types/prayer-group-types";
import { usePrayerGroupContext } from "../prayer-group-context";

export const usePrayerGroupEdit = () => {
  const formikRef = React.useRef<FormikProps<PrayerGroupDetails>>(null);
  const { prayerGroupDetails } = usePrayerGroupContext();

  React.useEffect(() => {
    formikRef.current?.resetForm({ values: prayerGroupDetails });
  }, [prayerGroupDetails]);

  return {
    formikRef,
  };
};
