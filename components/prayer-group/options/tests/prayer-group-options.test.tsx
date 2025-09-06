import { BottomSheetProps } from "@gorhom/bottom-sheet";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { renderHook, RenderResult } from "@testing-library/react-native";
import { useRef } from "react";

import { PrayerGroupRole } from "../../../../constants/prayer-group-constants";

import { mountComponent } from "../../../../tests/utils/test-utils";
import {
  PrayerGroupDetails,
  RawPrayerGroupDetails,
} from "../../../../types/prayer-group-types";
import { mockPrayerGroupDetails } from "../../tests/mock-data";
import { PrayerGroupOptions } from "../prayer-group-options";
import { PrayerGroupOptionsTestIds } from "./test-ids";

jest.mock("@gorhom/bottom-sheet", () => ({
  __esModule: true,
  ...require("@gorhom/bottom-sheet/mock"),
}));

let component: RenderResult;

const {
  result: { current: bottomSheetRef },
} = renderHook(() => useRef<BottomSheetProps & BottomSheetMethods>(null));

const mountPrayerGroupOptions = (prayerGroupDetails: PrayerGroupDetails) => {
  bottomSheetRef.current?.snapToIndex(0);

  return mountComponent(
    <PrayerGroupOptions
      prayerGroupDetails={prayerGroupDetails}
      bottomSheetRef={bottomSheetRef}
    />
  );
};

describe(PrayerGroupOptions, () => {
  afterEach(() => {
    component?.unmount();
  });

  test("Mount test", () => {
    component = mountPrayerGroupOptions(mockPrayerGroupDetails);
    expect(component).toBeTruthy();
  });

  test("If the user is an admin, show edit prayer group and manage users", async () => {
    component = mountPrayerGroupOptions(mockPrayerGroupDetails);
    const editPrayerGroupButton = await component.findByTestId(
      PrayerGroupOptionsTestIds.editButton
    );

    const manageUsersButton = await component.findByTestId(
      PrayerGroupOptionsTestIds.manageUsersButton
    );

    expect(editPrayerGroupButton).toBeTruthy();
    expect(manageUsersButton).toBeTruthy();
  });

  test("If the user is not an admin, hide edit prayer group and manage users", async () => {
    const prayerGroupDetails: RawPrayerGroupDetails = {
      ...mockPrayerGroupDetails,
      prayerGroupRole: PrayerGroupRole.Member,
    };

    component = mountPrayerGroupOptions(prayerGroupDetails);

    const editPrayerGroupButton = component.queryByTestId(
      PrayerGroupOptionsTestIds.editButton
    );

    const manageUsersButton = component.queryByTestId(
      PrayerGroupOptionsTestIds.manageUsersButton
    );

    expect(editPrayerGroupButton).toBeFalsy();
    expect(manageUsersButton).toBeFalsy();
  });
});
