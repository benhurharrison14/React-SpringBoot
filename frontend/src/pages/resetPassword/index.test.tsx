import React from "react";
import ResetPasswordPage from ".";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

describe("Reset Password Page", () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <ResetPasswordPage />
      </MemoryRouter>
    );
  });

  test("should render resetPassword page correctly", async () => {
    const resetCode = await screen.findByPlaceholderText("Enter reset code");
    fireEvent.change(resetCode, { target: { value: "123456" } });
    const resetButton = screen.getByText("Reset Password");
    fireEvent.click(resetButton);
  });

  test("verify login page navigation", async () => {
    const loginButton = await screen.findByText("Login");
    fireEvent.click(loginButton);
  });
});
