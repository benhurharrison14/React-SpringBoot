import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import {
  NAME_PLACEHOLDER,
  SIGNUP_ALT,
  SIGNUP_EMAIL_PLACEHOLDER,
  SIGNUP_PASSWORD_PLACEHOLDER,
} from "../../utils/constants";
import SignUpPage from ".";

describe("Signin Template", () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <SignUpPage/>
      </BrowserRouter>
    );
  });
  test("verify render", async () => {
    const nameField = screen.getByPlaceholderText(NAME_PLACEHOLDER);
    expect(nameField).toBeInTheDocument()
    const loginButton = screen.getByRole("button", { name: "Login" });
    expect(loginButton).toBeInTheDocument();
    await fireEvent.click(loginButton);
  });

  test("verify home-page navigation", async () => {
    const name = screen.getByPlaceholderText(NAME_PLACEHOLDER);
    const userId = screen.getByPlaceholderText(SIGNUP_EMAIL_PLACEHOLDER);
    const password = screen.getByPlaceholderText(SIGNUP_PASSWORD_PLACEHOLDER);

    fireEvent.change(name, { target: { value: "name" } });      
    fireEvent.change(userId, { target: { value: "user@gmail.com" } });
    fireEvent.change(password, { target: { value: "Password@123" } });

    await fireEvent.click(screen.getByText(SIGNUP_ALT));
  });
});
