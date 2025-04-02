import * as React from "react";

import { SEARCH_MIN_CHARACTERS } from "../../constants/input-constants";
import { useI18N } from "../../hooks/use-i18n";
import { PrayerGroupSummary } from "../../types/prayer-group-types";

export const usePrayerGroupSearch = () => {
  const { translate } = useI18N();

  const [groupQuery, setGroupQuery] = React.useState<string>("");
  const [groupSearchResults, setGroupSearchResults] = React.useState<
    PrayerGroupSummary[]
  >([]);

  const placeholderMessage = React.useMemo(() => {
    if (groupQuery.length < SEARCH_MIN_CHARACTERS) {
      return translate("prayerGroup.search.prompt");
    }

    if (groupSearchResults.length <= 0) {
      return translate("prayerGroup.search.noneFound");
    }
  }, [groupQuery.length, groupSearchResults.length, translate]);

  const onChangeQuery = (query: string) => {
    setGroupQuery(query);
  };

  return {
    groupQuery,
    onChangeQuery,
    placeholderMessage,
  };
};
