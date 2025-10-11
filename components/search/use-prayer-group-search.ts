import { usePathname } from "expo-router";
import { compact, debounce } from "lodash";
import * as React from "react";

import { usePostPrayerGroupSearch } from "../../api/post-prayer-group-search";
import { SEARCH_MIN_CHARACTERS } from "../../constants/input-constants";
import { useI18N } from "../../hooks/use-i18n";
import { PrayerGroupSummary } from "../../types/prayer-group-types";
import {
  DEBOUNCE_TIME,
  MAX_RESULT_COUNT,
} from "./prayer-group-search-constants";

export const usePrayerGroupSearch = () => {
  const { translate } = useI18N();

  const pathname = usePathname();

  const [isSearchLoading, setIsSearchLoading] = React.useState<boolean>(false);
  const [groupQuery, setGroupQuery] = React.useState<string>("");
  const [groupSearchResults, setGroupSearchResults] = React.useState<
    PrayerGroupSummary[]
  >([]);

  const postPrayerGroupSearch = usePostPrayerGroupSearch();

  const placeholderMessage = React.useMemo(() => {
    if (groupQuery.length < SEARCH_MIN_CHARACTERS) {
      return translate("prayerGroup.search.prompt");
    }

    if (isSearchLoading) {
      return translate("prayerGroup.search.loading");
    }

    if (groupSearchResults.length <= 0) {
      return translate("prayerGroup.search.noneFound");
    }
  }, [groupQuery.length, groupSearchResults.length, translate]);

  const loadPrayerGroups = React.useCallback(async (query: string) => {
    const response = await postPrayerGroupSearch(query, MAX_RESULT_COUNT);
    setIsSearchLoading(false);

    if (response.isError) {
      return;
    }

    const prayerGroupSummaries = response.value.prayerGroups ?? [];
    setGroupSearchResults(compact(prayerGroupSummaries));
  }, []);

  const debouncedLoadPrayerGroups = React.useMemo(
    () => debounce((query: string) => loadPrayerGroups(query), DEBOUNCE_TIME),
    [loadPrayerGroups]
  );

  const onChangeQuery = (query: string) => {
    setGroupQuery(query);

    if (query.length < SEARCH_MIN_CHARACTERS) {
      debouncedLoadPrayerGroups.cancel();
      setGroupSearchResults([]);
      return;
    }

    setIsSearchLoading(true);
    debouncedLoadPrayerGroups(query);
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
