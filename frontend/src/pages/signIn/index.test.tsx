import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import SignInPage from ".";
import { BrowserRouter } from "react-router-dom";
import {
  CONTINUE_ALT,
  GOOGLE_ALT,
  LOGIN_PASSWORD_PLACEHOLDER,
  LOGIN_PLACEHOLDER,
} from "../../utils/constants";

jest.mock("@auth0/auth0-react", () => ({
  useAuth0: () => ({
    loginWithRedirect: jest.fn(),
  }),
}));

describe("Signin Template", () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <SignInPage />
      </BrowserRouter>
    );
  });
  test("verify render", async () => {
    expect(
      screen.getByText("Enter your mail id and password to login")
    ).toBeInTheDocument();
    const signUpButton = screen.getByRole("button", { name: "Sign Up" });
    expect(signUpButton).toBeInTheDocument();
    await fireEvent.click(screen.getByRole("button", { name: "Sign Up" }));
  });

  test("verify forgot-password navigatiion", async () => {
    const forgotPasswordButton = screen.getByRole("button", {
      name: "Forgot Password?",
    });
    await fireEvent.click(forgotPasswordButton);
  });

  test("verify home-page navigation", () => {
    const userId = screen.getByPlaceholderText(LOGIN_PLACEHOLDER);
    const password = screen.getByPlaceholderText(LOGIN_PASSWORD_PLACEHOLDER);
    fireEvent.change(userId, { target: { value: "seeder@gmail.com" } });
    fireEvent.change(password, { target: { value: "Seeder@123" } });
    fireEvent.click(screen.getByText(CONTINUE_ALT));
  });

  test("verify render", () => {
    const googleButton = screen.getAllByAltText(GOOGLE_ALT);
    fireEvent.click(googleButton[0]);
  });
});
