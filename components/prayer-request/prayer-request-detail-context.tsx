import * as React from "react";

import { PrayerRequestModel } from "../../types/prayer-request-types";

export type PrayerRequestDetailContextType = {
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

export const PrayerRequestDetailContext =
  React.createContext<PrayerRequestDetailContextType>({
    prayerRequests: {},
    getPrayerRequestFromStore: () => {},
    setPrayerRequest: () => {},
    addPrayerRequestsToStore: () => {},
  } as PrayerRequestDetailContextType);

type Props = {
  children: React.ReactNode;
};

export const PrayerRequestDetailContextProvider: React.FC<Props> = ({
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
    <PrayerRequestDetailContext.Provider
      value={{
        addPrayerRequestsToStore: addPrayerRequests,
        prayerRequests,
        setPrayerRequest,
        getPrayerRequestFromStore: getPrayerRequest,
      }}
    >
      {children}
    </PrayerRequestDetailContext.Provider>
  );
};

export const usePrayerRequestDetailContext = () =>
  React.useContext(PrayerRequestDetailContext);
