import React from "react";
import { ForgotPasswordPage } from ".";
import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import { getUser } from "../../services";

jest.mock("axios");

describe("Forgot password page", () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <ForgotPasswordPage />
      </BrowserRouter>
    );
  });

  test("should render ForgotPasswordPage", async () => {
    const loginButton = await screen.findByText("Login");
    fireEvent.click(loginButton);
  });

  test("should render ForgotPasswordPage", async () => {
    const user = {
      name: "Test",
      email: "test@gmail.com",
      password: "Test@123",
      creditBalance: 880000,
    };
    const password = await screen.findByPlaceholderText("Enter your email id");
    fireEvent.change(password, {
      target: { value: "test@gmail.com" },
    });
    await getUser("test@gmail.com");
    axios.get = jest.fn().mockResolvedValue({ data: user });
    const resetButton = await screen.findByText("Reset Password");
    fireEvent.click(resetButton);
    const continueButton = await screen.findByText("Continue");
    fireEvent.click(continueButton);
  });
});
