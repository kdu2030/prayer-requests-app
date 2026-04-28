import * as React from "react";

import { PrayerRequestModel } from "../../types/prayer-request-types";

export type PrayerRequestDetailContextType = {
  prayerRequests: Record<number, PrayerRequestModel>;
  getPrayerRequest: (prayerRequestId: number) => PrayerRequestModel | undefined;
  setPrayerRequest: (
    prayerRequestId: number,
    prayerRequest: PrayerRequestModel,
  ) => void;
  addPrayerRequests: (prayerRequests: PrayerRequestModel[]) => void;
};

export const PrayerRequestDetailContext =
  React.createContext<PrayerRequestDetailContextType>({
    prayerRequests: {},
    getPrayerRequest: () => {},
    setPrayerRequest: () => {},
    addPrayerRequests: () => {},
  });

type Props = {
  children: React.ReactNode;
};

export const PrayerRequestDetailContextProvider: React.FC<Props> = ({
  children,
}) => {
  const [prayerRequests, setPrayerRequests] = React.useState<
    Record<number, PrayerRequestModel>
  >({});

  const getPrayerRequest = (
    prayerRequestId: number,
  ): PrayerRequestModel | undefined => {
    return prayerRequests[prayerRequestId];
  };

  const setPrayerRequest = (
    prayerRequestId: number,
    prayerRequest: PrayerRequestModel,
  ) => {
    setPrayerRequests((prayerRequests) => ({
      ...prayerRequests,
      [prayerRequestId]: prayerRequest,
    }));
  };

  const addPrayerRequests = (prayerRequests: PrayerRequestModel[]) => {
    setPrayerRequests((currentPrayerRequests) => {
      const updatedPrayerRequests: Record<number, PrayerRequestModel> = {
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
        addPrayerRequests,
        prayerRequests,
        setPrayerRequest,
        getPrayerRequest,
      }}
    >
      {children}
    </PrayerRequestDetailContext.Provider>
  );
};

export const usePrayerRequestDetailContext = () =>
  React.useContext(PrayerRequestDetailContext);
