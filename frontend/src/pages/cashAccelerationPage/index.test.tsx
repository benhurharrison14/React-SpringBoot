import { fireEvent, render, screen } from "@testing-library/react";
import CashAccelerationPage from ".";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import {
  cashAcclerationRows,
  mockCashKicks,
  mockContracts,
} from "../../utils/constants";

jest.mock("../../services", () => ({
  getContracts: jest.fn(() => Promise.resolve(mockContracts)),
  getCashkicks: jest.fn(() => Promise.resolve(mockCashKicks)),
  getSelectedContractIds: jest.fn(() => Promise.resolve([1, 2, 3])),
  getAllSelectedContracts: jest.fn(() => Promise.resolve(cashAcclerationRows)),
}));

describe("Cash Acceleration Page", () => {
  test("verify page render", async () => {
    render(
      <BrowserRouter>
        <CashAccelerationPage />
      </BrowserRouter>
    );
    expect(
      screen.getByRole("button", { name: "New Cash Kick" })
    ).toBeInTheDocument();
    const contractsTab = screen.getByRole("tab", { name: /my contracts/i });
    fireEvent.click(contractsTab);
    expect(screen.getAllByRole("row")).toHaveLength(1);
    const cashKicksTab = screen.getByRole("tab", { name: /my cash kicks/i });
    fireEvent.click(cashKicksTab);
    expect(screen.getAllByRole("columnheader")).toHaveLength(5);
  });
});
