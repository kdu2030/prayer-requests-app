import "@testing-library/jest-native/extend-expect";
import "@testing-library/jest-native";

import { RenderResult, waitFor } from "@testing-library/react-native";
import * as React from "react";

import { GetPrayerGroupUsersResponse } from "../../../../api/get-prayer-group-users";
import { PrayerGroupRole } from "../../../../constants/prayer-group-constants";
import { mapPrayerGroupDetails } from "../../../../mappers/map-prayer-group";
import { mountComponent } from "../../../../tests/utils/test-utils";
import { ManagedErrorResponse } from "../../../../types/error-handling";
import {
  PrayerGroupDetails,
  RawPrayerGroupUserSummary,
} from "../../../../types/prayer-group-types";
import { mockRawPrayerGroupDetails, mockUserData } from "../../tests/mock-data";
import { PrayerGroupUsers } from "../prayer-group-users";
import { mockRawPrayerGroupUsers } from "./mock-data";

let component: RenderResult;

const mockUsePrayerGroupContext = jest.fn();
const mockGetPrayerGroupUsers = jest.fn();

jest.mock("../../prayer-group-context", () => ({
  usePrayerGroupContext: () => mockUsePrayerGroupContext(),
}));

jest.mock("../../../../hooks/use-api-data", () => ({
  ...jest.requireActual("../../../../hooks/use-api-data"),
  useApiDataContext: () => ({
    userData: mockUserData,
    setUserData: jest.fn(),
  }),
}));

jest.mock("../../../../api/get-prayer-group-users", () => ({
  useGetPrayerGroupUsers: () => (id: number, roles: PrayerGroupRole[]) =>
    mockGetPrayerGroupUsers(id, roles),
}));

const mountPrayerGroupUsers = (
  prayerGroupDetails: PrayerGroupDetails,
  prayerGroupUsers: RawPrayerGroupUserSummary[]
) => {
  mockUsePrayerGroupContext.mockReturnValue({
    prayerGroupDetails,
    setPrayerGroupDetails: jest.fn(),
  });

  const getUsersResponse: ManagedErrorResponse<GetPrayerGroupUsersResponse> = {
    isError: false,
    value: {
      users: prayerGroupUsers,
    },
  };

  mockGetPrayerGroupUsers.mockReturnValue(getUsersResponse);

  return mountComponent(
    <PrayerGroupUsers prayerGroupId={mockRawPrayerGroupDetails.id ?? -1} />
  );
};

describe(PrayerGroupUsers, () => {
  afterEach(() => {
    component?.unmount();
  });

  test("Mount test", async () => {
    component = mountPrayerGroupUsers(
      mapPrayerGroupDetails(mockRawPrayerGroupDetails),
      mockRawPrayerGroupUsers
    );

    await waitFor(() => {
      expect(component).toBeTruthy();
    });
  });
});
