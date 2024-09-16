import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import CashKickSuccess from ".";
import { CLOSE_BTN_ALT, CROSS_ICON_ALT, VIEW_CASH_KICK_ALT } from "../../../utils/constants";

describe("Seeder CashKickSuccess", () => {
  it("render the Seeder CashKickSuccess without errors", () => {
    const handleCancelButton = jest.fn();
    const handleCrossIcon = jest.fn();
    const handleViewCashKickButton = jest.fn();
    const element = render(
      <CashKickSuccess  handleCancelButton={handleCancelButton} handleCrossIcon={handleCrossIcon} handleViewCashKickButton={handleViewCashKickButton}/>
    );
    expect(element).toBeDefined();

    fireEvent.click(screen.getByText(CLOSE_BTN_ALT));
    expect(handleCancelButton).toBeCalled();

    fireEvent.click(screen.getByText(VIEW_CASH_KICK_ALT));
    expect(handleViewCashKickButton).toBeCalled();

    fireEvent.click(screen.getByAltText(CROSS_ICON_ALT));
    expect(handleCrossIcon).toBeCalled();

  });
});
