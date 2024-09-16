import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import NewCashKick from ".";
import React from "react";
import { NEW_CASHKICK_BUTTON } from "../../../utils/constants";
import { BrowserRouter } from "react-router-dom";
import { useAppContext } from "../../../context";

jest.mock("../../../context", () => {
  return {
    ...jest.requireActual("../../../context"),
    useAppContext: jest.fn(),
  };
});

describe("New CashKick component", () => {
  beforeEach(() => {
    (useAppContext as jest.Mock).mockImplementation(() => ({
      creditBalance: 600000,
    }));
  });

  test("verify component render", async () => {
    render(
      <BrowserRouter>
        <NewCashKick creditBalance={709546} />
      </BrowserRouter>
    );
    expect(screen.getByText("Launch a new Cash Kick")).toBeInTheDocument();
    expect(screen.getByText(/709,546.00/i)).toBeInTheDocument();
    const newCashKickButton = screen.getByRole("button", {
      name: NEW_CASHKICK_BUTTON,
    });
    expect(newCashKickButton).toBeInTheDocument();
    await fireEvent.click(newCashKickButton);
    await waitFor(() => {
      expect(screen.queryByText("Outstanding amount")).not.toBeInTheDocument();
    });
  });
});
