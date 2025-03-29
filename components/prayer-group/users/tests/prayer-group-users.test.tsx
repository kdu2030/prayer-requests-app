import "@testing-library/jest-native/extend-expect";
import "@testing-library/jest-native";

import {
  act,
  fireEvent,
  RenderResult,
  waitFor,
} from "@testing-library/react-native";
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
import { PrayerGroupUsersTestIds } from "./test-ids";

let component: RenderResult;

const mockUsePrayerGroupContext = jest.fn();

const mockGetPrayerGroupUsers = jest.fn();
const mockPutPrayerGroupAdmins = jest.fn();
const mockDeletePrayerGroupUsers = jest.fn();

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

jest.mock("../../../../api/put-prayer-group-admins", () => ({
  usePutPrayerGroupAdmins: () => (id: number, userIds: number[]) =>
    mockPutPrayerGroupAdmins(id, userIds),
}));

jest.mock("../../../../api/delete-prayer-group-users", () => ({
  useDeletePrayerGroupUsers: () => (id: number, userIds: number[]) =>
    mockDeletePrayerGroupUsers(id, userIds),
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
    jest.resetAllMocks();
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

  test("User can be searched by display name", async () => {
    component = mountPrayerGroupUsers(
      mapPrayerGroupDetails(mockRawPrayerGroupDetails),
      mockRawPrayerGroupUsers
    );

    const searchBar = await component.findByTestId(
      PrayerGroupUsersTestIds.searchBar
    );
    fireEvent.changeText(searchBar, "Halpert");

    act(() => jest.advanceTimersByTime(200));

    const userResultDisplayName = await component.findByTestId(
      `${PrayerGroupUsersTestIds.userDisplayName}[0]`
    );
    expect(userResultDisplayName).toHaveTextContent(
      mockRawPrayerGroupUsers[0].fullName ?? ""
    );
  });

  test("User can be searched by username", async () => {
    component = mountPrayerGroupUsers(
      mapPrayerGroupDetails(mockRawPrayerGroupDetails),
      mockRawPrayerGroupUsers
    );

    const searchBar = await component.findByTestId(
      PrayerGroupUsersTestIds.searchBar
    );
    fireEvent.changeText(searchBar, "dschrute");

    act(() => jest.advanceTimersByTime(200));

    const userResultDisplayName = await component.findByTestId(
      `${PrayerGroupUsersTestIds.userDisplayName}[0]`
    );
    expect(userResultDisplayName).toHaveTextContent(
      mockRawPrayerGroupUsers[1].fullName ?? ""
    );
  });

  test("Prayer group role gets updated when role change button is pressed", async () => {
    component = mountPrayerGroupUsers(
      mapPrayerGroupDetails(mockRawPrayerGroupDetails),
      mockRawPrayerGroupUsers
    );

    const roleChangeButton = await component.findByTestId(
      `${PrayerGroupUsersTestIds.roleChangeButton}[1]`
    );
    fireEvent.press(roleChangeButton);

    const adminRoleChangeButton = await component.findByTestId(
      `${PrayerGroupUsersTestIds.roleChangeButton}[1]`
    );
    expect(adminRoleChangeButton).toHaveTextContent("Admin");
  });

  test("User no longer displays after user is deleted", async () => {
    component = mountPrayerGroupUsers(
      mapPrayerGroupDetails(mockRawPrayerGroupDetails),
      mockRawPrayerGroupUsers
    );

    const deleteButton = await component.findByTestId(
      `${PrayerGroupUsersTestIds.deleteUserButton}[1]`
    );
    fireEvent.press(deleteButton);

    const deleteConfirmButton = await component.findByTestId(
      PrayerGroupUsersTestIds.deleteConfirmButton
    );
    fireEvent.press(deleteConfirmButton);

    await waitFor(() => {
      const deletedUser = component.queryByText(
        mockRawPrayerGroupUsers[1].username ?? ""
      );
      expect(deletedUser).toBeFalsy();
    });
  });

  test("Role change gets saved properly", async () => {
    mockPutPrayerGroupAdmins.mockReturnValue({ isError: false });

    component = mountPrayerGroupUsers(
      mapPrayerGroupDetails(mockRawPrayerGroupDetails),
      mockRawPrayerGroupUsers
    );

    const roleChangeButton = await component.findByTestId(
      `${PrayerGroupUsersTestIds.roleChangeButton}[2]`
    );
    fireEvent.press(roleChangeButton);

    const saveButton = await component.findByTestId(
      PrayerGroupUsersTestIds.saveButton
    );
    fireEvent.press(saveButton);

    await waitFor(() => {
      expect(mockPutPrayerGroupAdmins).toHaveBeenCalledWith(2, [1, 3]);
    });
  });

  test("Delete user gets saved properly", async () => {
    mockDeletePrayerGroupUsers.mockReturnValue({ isError: false });
    mockPutPrayerGroupAdmins.mockReturnValue({ isError: false });

    component = mountPrayerGroupUsers(
      mapPrayerGroupDetails(mockRawPrayerGroupDetails),
      mockRawPrayerGroupUsers
    );

    const deleteUserButton = await component.findByTestId(
      `${PrayerGroupUsersTestIds.deleteUserButton}[1]`
    );
    fireEvent.press(deleteUserButton);

    const deleteConfirmButton = await component.findByTestId(
      PrayerGroupUsersTestIds.deleteConfirmButton
    );
    fireEvent.press(deleteConfirmButton);

    const saveButton = await component.findByTestId(
      PrayerGroupUsersTestIds.saveButton
    );
    fireEvent.press(saveButton);

    await waitFor(() => {
      expect(mockDeletePrayerGroupUsers).toHaveBeenCalledWith(2, [2]);
    });
  });
});
