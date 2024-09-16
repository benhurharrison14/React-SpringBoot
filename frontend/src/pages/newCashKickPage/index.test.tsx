import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import NewCashkickPage from ".";
import {
  CANCEL_BTN_ALT,
  CLOSE_BTN_ALT,
  CREATE_CASH_KICK,
  NAME_CASH_KICK_PLACEHOLDER,
  SUMMARY_REVIEW_CREDIT_BUTTON,
  SUMMARY_SUBMIT_CREDIT_BUTTON,
  VIEW_CASH_KICK_ALT,
  mockCashKicks,
  mockContracts,
  mockPayments,
} from "../../utils/constants";
import { BrowserRouter } from "react-router-dom";
import { getCashkicks, getContracts, postCashKick, postPayment } from "../../services";
import { useAppContext } from "../../context";

jest.mock("../../services", () => ({
  getContracts: jest.fn(),
  postCashKick: jest.fn(),
  getCashkicks: jest.fn(),
  postSelectedContracts: jest.fn(),
  postPayment: jest.fn()
}));

jest.mock("../../context", () => {
  return {
    ...jest.requireActual("../../context"),
    useAppContext: jest.fn(),
  };
});

describe("Seeder New cash Kick Page", () => {
  beforeEach(() => {
    (getContracts as jest.Mock).mockResolvedValue(mockContracts);
    (getCashkicks as jest.Mock).mockResolvedValue(mockCashKicks);
    (postCashKick as jest.Mock).mockResolvedValue(mockCashKicks);
    (useAppContext as jest.Mock).mockImplementation(() => ({
      creditBalance: 600000,
    }));
    (postPayment as jest.Mock).mockResolvedValue(mockPayments)
  });

  it("render the Seeder NewCashkickPage without errors", async () => {
    const element = render(
      <BrowserRouter>
        <NewCashkickPage />
      </BrowserRouter>
    );

    expect(element).toBeDefined();

    await new Promise((r) => setTimeout(r, 1000));

    const checkbox = screen.getAllByRole("row");

    fireEvent.click(checkbox[3]);

    fireEvent.click(screen.getByText("Reset"));

    const slider = screen.getByRole("slider");

    fireEvent.change(slider, { target: { value: 203440 } });

    fireEvent.change(slider, { target: { value: 120720 } });

    fireEvent.click(screen.getByText("Reset"));

    fireEvent.change(slider, { target: { value: 127000 } });
    fireEvent.change(slider, { target: { value: 10000 } });

    fireEvent.change(slider, { target: { value: 420440 } });

    await fireEvent.click(screen.getByText(SUMMARY_REVIEW_CREDIT_BUTTON));

    await waitFor(() => {
      screen.getByText(SUMMARY_SUBMIT_CREDIT_BUTTON);
    });

    await fireEvent.click(screen.getByText(SUMMARY_SUBMIT_CREDIT_BUTTON));

    const nameCashKick = screen.getByPlaceholderText(
      NAME_CASH_KICK_PLACEHOLDER
    );
    await fireEvent.change(nameCashKick, { target: { value: "Rajesh" } });

    await fireEvent.click(screen.getByText(CREATE_CASH_KICK));

    await new Promise((r) => setTimeout(r, 2000));

    fireEvent.click(screen.getByText(VIEW_CASH_KICK_ALT));
  }, 10000);

  it("render the Seeder NewCashkickPage with navigations", async () => {
    const element = render(
      <BrowserRouter>
        <NewCashkickPage />
      </BrowserRouter>
    );

    expect(element).toBeDefined();

    fireEvent.click(screen.getByText("Back"));
  });

  it("render the Seeder NewCashkickPage with modal navigations", async () => {
    const element = render(
      <BrowserRouter>
        <NewCashkickPage />
      </BrowserRouter>
    );

    expect(element).toBeDefined();
    await new Promise((r) => setTimeout(r, 2000));

    const checkbox = screen.getAllByRole("row");

    fireEvent.click(checkbox[3]);

    fireEvent.click(screen.getByText("Reset"));

    const slider = screen.getByRole("slider");
    fireEvent.change(slider, { target: { value: 203440 } });

    fireEvent.change(slider, { target: { value: 120720 } });

    fireEvent.click(screen.getByText("Reset"));

    fireEvent.change(slider, { target: { value: 620440 } });

    fireEvent.click(screen.getByText(SUMMARY_REVIEW_CREDIT_BUTTON));

    await waitFor(() => {
      screen.getByText(SUMMARY_SUBMIT_CREDIT_BUTTON);
    });

    fireEvent.click(screen.getByText(SUMMARY_SUBMIT_CREDIT_BUTTON));

    const nameCashKick = screen.getByPlaceholderText(
      NAME_CASH_KICK_PLACEHOLDER
    );
    fireEvent.change(nameCashKick, { target: { value: "Rajesh" } });

    expect(screen.getByText(CANCEL_BTN_ALT)).toBeInTheDocument();

    await fireEvent.click(screen.getByText(CREATE_CASH_KICK));

    await new Promise((r) => setTimeout(r, 2000));

    expect(screen.getByText(CLOSE_BTN_ALT)).toBeInTheDocument();

    await fireEvent.click(screen.getByText(CLOSE_BTN_ALT));
  }, 15000);
});
