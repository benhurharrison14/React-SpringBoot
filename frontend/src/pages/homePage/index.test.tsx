import { render, screen, waitFor } from "@testing-library/react";
import HomePage from ".";
import React from "react";
import axios from "axios";
import { getPayments } from "../../services";
import { advanceTo, clear } from "jest-date-mock";
import { mockCashKicks, mockPayments } from "../../utils/constants";
import { BrowserRouter } from "react-router-dom";

jest.mock("../../services", () => ({
  getPayments: jest.fn(),
  getCashkicks: jest.fn(() => Promise.resolve(mockCashKicks)),
}));

describe("Home Page", () => {
  afterEach(() => {
    clear();
  });

  beforeEach(() => {
    (getPayments as jest.Mock).mockResolvedValue(mockPayments);
  });

  test("verify page renders correctly", async () => {
    render(
      <BrowserRouter>
        <HomePage isExistingUser />
      </BrowserRouter>
    );
    axios.get = jest
      .fn()
      .mockImplementation(() => Promise.resolve(mockPayments));
    advanceTo(new Date("2023-07-24T20:00:00"));
    await waitFor(() => {
      expect(screen.getAllByRole("row")).toHaveLength(1);
    });
  });

  test("testing morning salutation", async () => {
    render(
      <BrowserRouter>
        <HomePage isExistingUser={false} />
      </BrowserRouter>
    );
    advanceTo(new Date("2023-07-24T10:00:00"));
    await waitFor(() => {
      expect(screen.getByAltText("greeting image")).toBeInTheDocument();
    });
  });

  test("testing afternoon salutation", async () => {
    render(
      <BrowserRouter>
        <HomePage isExistingUser={false} />
      </BrowserRouter>
    );
    advanceTo(new Date("2023-07-24T15:00:00"));
    await waitFor(() => {
      expect(screen.getByAltText("greeting image")).toBeInTheDocument();
    });
  });
});
