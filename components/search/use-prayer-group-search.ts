import { usePathname } from "expo-router";
import { compact, debounce } from "lodash";
import * as React from "react";

import { useGetPrayerGroupsBySearch } from "../../api/get-prayer-groups-by-search";
import { SEARCH_MIN_CHARACTERS } from "../../constants/input-constants";
import { useI18N } from "../../hooks/use-i18n";
import { mapPrayerGroupSummary } from "../../mappers/map-prayer-group";
import { PrayerGroupSummary } from "../../types/prayer-group-types";
import {
  DEBOUNCE_TIME,
  MAX_RESULT_COUNT,
} from "./prayer-group-search-constants";

export const usePrayerGroupSearch = () => {
  const { translate } = useI18N();

  const pathname = usePathname();

  const [groupQuery, setGroupQuery] = React.useState<string>("");
  const [groupSearchResults, setGroupSearchResults] = React.useState<
    PrayerGroupSummary[]
  >([]);

  const getPrayerGroupsBySearch = useGetPrayerGroupsBySearch();

  const placeholderMessage = React.useMemo(() => {
    if (groupQuery.length < SEARCH_MIN_CHARACTERS) {
      return translate("prayerGroup.search.prompt");
    }

    if (groupSearchResults.length <= 0) {
      return translate("prayerGroup.search.noneFound");
    }
  }, [groupQuery.length, groupSearchResults.length, translate]);

  const loadPrayerGroups = async (query: string) => {
    const response = await getPrayerGroupsBySearch(query, MAX_RESULT_COUNT);
    if (response.isError) {
      return;
    }

    const prayerGroupSummaries = response.value.map((rawSummary) =>
      mapPrayerGroupSummary(rawSummary)
    );
    setGroupSearchResults(compact(prayerGroupSummaries));
  };

  const onChangeQuery = (query: string) => {
    setGroupQuery(query);

    if (query.length < SEARCH_MIN_CHARACTERS) {
      setGroupSearchResults([]);
      return;
    }

    const debouncedLoadResults = debounce(
      () => loadPrayerGroups(query),
      DEBOUNCE_TIME
    );
    debouncedLoadResults();
  };

  React.useEffect(() => {
    setGroupQuery("");
    setGroupSearchResults([]);
  }, [pathname]);

  return {
    groupQuery,
    onChangeQuery,
    placeholderMessage,
    groupSearchResults,
  };
};
