import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import Login from ".";
import {
  CONTINUE_ALT,
  LOGIN_PASSWORD_PLACEHOLDER,
  LOGIN_PLACEHOLDER,
  NAME_PLACEHOLDER,
  SIGNUP_ALT,
  SIGNUP_EMAIL_PLACEHOLDER,
  SIGNUP_PASSWORD_PLACEHOLDER,
  VISIBILITY_ALT,
} from "../../../utils/constants";
import { useAppContext } from "../../../context";
import { BrowserRouter } from "react-router-dom";

jest.mock("../../../context", () => {
  return {
    ...jest.requireActual("../../../context"),
    useAppContext: jest.fn(),
  };
});

jest.mock("../../../services", () => ({
  getUserDetail: jest.fn(() =>
    Promise.resolve({
      userId: 123,
      name: "John",
      email: "john@gmail.com",
      creditBalance: 1000,
      token: "mockToken",
    })
  ),
  postUser: jest.fn(),
}));

describe("Seeder Login", () => {
  beforeEach(() => {
    (useAppContext as jest.Mock).mockImplementation(() => ({
      setUserId: jest.fn(),
      setCreditBalance: jest.fn(),
      setUserName: jest.fn(),
    }));
  });

  it("render the Seeder Login without errors", async () => {
    const element = render(
      <BrowserRouter>
        <Login
          handleForgotPassword={jest.fn()}
          handleGoogleLogin={jest.fn()}
          handleSignUp={jest.fn()}
        />
      </BrowserRouter>
    );
    expect(element).toBeDefined();

    fireEvent.click(screen.getByAltText(VISIBILITY_ALT));
    fireEvent.click(screen.getByAltText(VISIBILITY_ALT));

    const password = screen.getByPlaceholderText(LOGIN_PASSWORD_PLACEHOLDER);
    fireEvent.change(password, { target: { value: "password" } });

    const username = screen.getByPlaceholderText(LOGIN_PLACEHOLDER);
    fireEvent.change(username, { target: { value: "username" } });

    fireEvent.focus(password);
    fireEvent.focus(username);
    fireEvent.blur(password);

    fireEvent.change(password, { target: { value: "John123" } });
    fireEvent.change(username, { target: { value: "john@gmail.com" } });
    fireEvent.change(password, { target: { value: "John@123" } });

    await fireEvent.click(screen.getByText(CONTINUE_ALT));
  });

  it("render the Seeder SignUp without errors", async () => {
    const element = render(
      <BrowserRouter>
        <Login
          handleForgotPassword={jest.fn()}
          handleGoogleLogin={jest.fn()}
          handleSignIn={jest.fn()}
          handleContinueSignUp={jest.fn()}
          signup={true}
        />
      </BrowserRouter>
    );
    expect(element).toBeDefined();

    const name = screen.getByPlaceholderText(NAME_PLACEHOLDER);
    const userId = screen.getByPlaceholderText(SIGNUP_EMAIL_PLACEHOLDER);
    const password = screen.getByPlaceholderText(SIGNUP_PASSWORD_PLACEHOLDER);
    fireEvent.change(password, { target: { value: "password" } });
    fireEvent.change(userId, { target: { value: "username" } });
    fireEvent.change(name, { target: { value: "name" } });

    fireEvent.change(userId, { target: { value: "user@gmail.com" } });
    fireEvent.change(password, { target: { value: "Password@123" } });

    await fireEvent.click(screen.getByText(SIGNUP_ALT));
  });
});
