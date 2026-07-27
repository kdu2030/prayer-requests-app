import * as React from "react";

import { PrayerRequestModel } from "../../types/prayer-request-types";

export type GlobalPrayerRequestsContextType = {
  prayerRequests: Record<number, PrayerRequestModel | undefined>;
  getPrayerRequestFromStore: (
    prayerRequestId: number,
  ) => PrayerRequestModel | undefined;
  setPrayerRequest: (
    prayerRequestId: number,
    prayerRequest: PrayerRequestModel | undefined,
  ) => void;
  addPrayerRequestsToStore: (prayerRequests: PrayerRequestModel[]) => void;
};

export const GlobalPrayerRequestsContext =
  React.createContext<GlobalPrayerRequestsContextType>({
    prayerRequests: {},
    getPrayerRequestFromStore: () => {},
    setPrayerRequest: () => {},
    addPrayerRequestsToStore: () => {},
  } as GlobalPrayerRequestsContextType);

type Props = {
  children: React.ReactNode;
};

export const GlobalPrayerRequestsContextProvider: React.FC<Props> = ({
  children,
}) => {
  const [prayerRequests, setPrayerRequests] = React.useState<
    Record<number, PrayerRequestModel | undefined>
  >({});

  const getPrayerRequest = (
    prayerRequestId: number,
  ): PrayerRequestModel | undefined => {
    return prayerRequests[prayerRequestId];
  };

  const setPrayerRequest = (
    prayerRequestId: number,
    prayerRequest: PrayerRequestModel | undefined,
  ) => {
    setPrayerRequests((prayerRequests) => ({
      ...prayerRequests,
      [prayerRequestId]: prayerRequest,
    }));
  };

  const addPrayerRequests = (prayerRequests: PrayerRequestModel[]) => {
    setPrayerRequests((currentPrayerRequests) => {
      const updatedPrayerRequests: Record<
        number,
        PrayerRequestModel | undefined
      > = {
        ...currentPrayerRequests,
      };

      prayerRequests.forEach((prayerRequest) => {
        if (!prayerRequest.prayerRequestId) {
          return;
        }

        updatedPrayerRequests[prayerRequest.prayerRequestId] = prayerRequest;
      });

      return updatedPrayerRequests;
    });
  };

  return (
    <GlobalPrayerRequestsContext.Provider
      value={{
        addPrayerRequestsToStore: addPrayerRequests,
        prayerRequests,
        setPrayerRequest,
        getPrayerRequestFromStore: getPrayerRequest,
      }}
    >
      {children}
    </GlobalPrayerRequestsContext.Provider>
  );
};

export const useGlobalPrayerRequestsContext = () =>
  React.useContext(GlobalPrayerRequestsContext);
