import { render, screen } from "@testing-library/react";
import React from "react";
import { CashAccelerationBox } from ".";
import {
  getAllSelectedContracts,
  getCashkicks,
  getContracts,
  getSelectedContractIds,
} from "../../../services";
import { clear } from "jest-date-mock";
import { cashAcclerationRows, cashKickRows } from "../../../utils/constants";

const contractsIdsList = [1, 2, 3];

jest.mock("../../../services", () => ({
  getContracts: jest.fn(),
  getCashkicks: jest.fn(),
  getSelectedContractIds: jest.fn(() => Promise.resolve(contractsIdsList)),
  getAllSelectedContracts: jest.fn(() => Promise.resolve(cashAcclerationRows)),
}));

describe("cash acceleration box component", () => {
  afterEach(() => {
    clear();
  });

  beforeEach(() => {
    (getContracts as jest.Mock).mockResolvedValue(cashAcclerationRows);
    (getCashkicks as jest.Mock).mockResolvedValue(cashKickRows);
  });

  test("render CashAccelerationBox correctly", async () => {
    render(<CashAccelerationBox />);

    const heading = screen.getByText("Cash acceleration");
    expect(heading).toBeInTheDocument;

    await getContracts();
    await getCashkicks(1);
    await getSelectedContractIds(1);
    await new Promise((r) => setTimeout(r, 2000));
    await getAllSelectedContracts([1, 2, 3]);
  });
});
