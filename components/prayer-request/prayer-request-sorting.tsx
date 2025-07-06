import * as React from "react";
import { View } from "react-native";
import { Button, Text } from "react-native-paper";

import { useI18N } from "../../hooks/use-i18n";
import {
  PrayerRequestFilterCriteria,
  PrayerRequestSortFields,
} from "../../types/prayer-request-types";
import { Select } from "../inputs/select";
import { AppBottomSheet } from "../layouts/app-bottom-sheet";
import { usePrayerRequestSorting } from "./use-prayer-request-sorting";

type Props = {
  isSortingOpen: boolean;
  setIsSortingOpen: React.Dispatch<React.SetStateAction<boolean>>;
  filterCriteria: PrayerRequestFilterCriteria;
  setFilterCriteria: React.Dispatch<
    React.SetStateAction<PrayerRequestFilterCriteria>
  >;
};

export const PrayerRequestSorting: React.FC<Props> = ({
  isSortingOpen,
  setIsSortingOpen,
  filterCriteria,
  setFilterCriteria,
}) => {
  const { translate } = useI18N();
  const { sortFieldOptions } = usePrayerRequestSorting();

  return (
    <AppBottomSheet
      isOpen={isSortingOpen}
      setIsOpen={setIsSortingOpen}
      snapPoints={["50%"]}
    >
      <View className="px-4">
        <Text variant="titleMedium" className="font-bold mb-4">
          {translate("prayerRequest.sorting.header")}
        </Text>

        <Select
          label={translate("prayerRequest.sorting.sortBy")}
          value={filterCriteria.sortConfig.sortField}
          options={sortFieldOptions}
          setValue={(value) =>
            setFilterCriteria((filterCriteria) => ({
              ...filterCriteria,
              sortConfig: {
                ...filterCriteria.sortConfig,
                sortField: value as PrayerRequestSortFields,
              },
            }))
          }
        />

        <Button mode="contained" className="mt-3">
          {translate("prayerRequest.sorting.action")}
        </Button>
      </View>
    </AppBottomSheet>
  );
};
