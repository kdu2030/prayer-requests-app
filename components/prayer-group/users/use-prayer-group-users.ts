import * as React from "react";

import { PrayerGroupUserSummary } from "../../../types/prayer-group-types";

export const usePrayerGroupUsers = (prayerGroupId: number) => {
  const [prayerGroupUsers, setPrayerGroupUsers] = React.useState<
    PrayerGroupUserSummary[]
  >([]);

  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isError, setIsError] = React.useState<boolean>(true);

  return { isLoading, setIsLoading, isError };
};
