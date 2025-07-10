import * as React from "react";
import { View } from "react-native";
import { Button, RadioButton, Text } from "react-native-paper";

import { useI18N } from "../../hooks/use-i18n";
import { SortOrder } from "../../types/api-response-types";
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
  initialFilterCriteria: PrayerRequestFilterCriteria;
  onUpdateFilters: (filterCriteria: PrayerRequestFilterCriteria) => void;
};

export const PrayerRequestSorting: React.FC<Props> = ({
  isSortingOpen,
  setIsSortingOpen,
  initialFilterCriteria,
}) => {
  const { translate } = useI18N();
  const { sortFieldOptions, filterCriteria, setFilterCriteria } =
    usePrayerRequestSorting(initialFilterCriteria);

  return (
    <AppBottomSheet
      isOpen={isSortingOpen}
      setIsOpen={setIsSortingOpen}
      snapPoints={["50%"]}
    >
      <View className="h-full px-4">
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

        <View className="mt-5">
          <Text variant="labelMedium">
            {translate("prayerRequest.sorting.sortDirection")}
          </Text>

          <RadioButton.Group
            value={filterCriteria.sortConfig.sortOrder.toString()}
            onValueChange={(value) =>
              setFilterCriteria((filterCriteria) => ({
                ...filterCriteria,
                sortConfig: {
                  ...filterCriteria.sortConfig,
                  sortOrder: +value,
                },
              }))
            }
          >
            <RadioButton.Item
              label={translate("prayerRequest.sorting.ascending")}
              value={SortOrder.Ascending.toString()}
            />

            <RadioButton.Item
              label={translate("prayerRequest.sorting.descending")}
              value={SortOrder.Descending.toString()}
            />
          </RadioButton.Group>
        </View>

        <Button mode="contained" className="mt-auto mb-6">
          {translate("prayerRequest.sorting.action")}
        </Button>
      </View>
    </AppBottomSheet>
  );
};
