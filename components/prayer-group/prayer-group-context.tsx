import * as React from "react";

import { PrayerGroupDetails } from "../../types/prayer-group-types";

export type PrayerGroupContextType = {
  prayerGroupDetails?: PrayerGroupDetails;
  setPrayerGroupDetails: React.Dispatch<
    React.SetStateAction<PrayerGroupDetails | undefined>
  >;
};

const DEFAULT_PRAYER_GROUP_CONTEXT: PrayerGroupContextType = {
  setPrayerGroupDetails: () => {},
};

const PrayerGroupContext = React.createContext<PrayerGroupContextType>(
  DEFAULT_PRAYER_GROUP_CONTEXT
);

type Props = {
  children: React.ReactNode;
};

export const PrayerGroupContextProvider: React.FC<Props> = ({ children }) => {
  const [prayerGroupDetails, setPrayerGroupDetails] = React.useState<
    PrayerGroupDetails | undefined
  >();

  return (
    <PrayerGroupContext.Provider
      value={{ prayerGroupDetails, setPrayerGroupDetails }}
    >
      {children}
    </PrayerGroupContext.Provider>
  );
};

export const usePrayerGroupContext = () => React.useContext(PrayerGroupContext);
