import { fireEvent, render, screen } from "@testing-library/react";
import { ChangePassowrd } from ".";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import { resetPassword } from "../../../services";
import axios from "axios";

beforeEach(() => {
  render(
    <MemoryRouter
      initialEntries={["/reset-password", { state: "test@gmail.com" }]}
    >
      <ChangePassowrd />
    </MemoryRouter>
  );
});

test("should render ChangePassword correctly and simulate focus and blur", async () => {
  const user = {
    name: "Test",
    email: "test@gmail.com",
    password: "Test@123",
    creditBalance: 880000,
  };
  const password = await screen.findByPlaceholderText("Enter new password");
  fireEvent.change(password, { target: { value: "Password@123" } });
  const reEnteredPassword = await screen.findByPlaceholderText(
    "Confirm password"
  );
  fireEvent.change(reEnteredPassword, { target: { value: "Password@123" } });

  fireEvent.focus(password);
  fireEvent.blur(password);
  fireEvent.focus(reEnteredPassword);
  fireEvent.blur(reEnteredPassword);
  const changePasswordButton = await screen.findByRole("button", {
    name: "Change Password",
  });
  fireEvent.click(changePasswordButton);
  axios.put = jest.fn().mockResolvedValue({ data: user });
  await resetPassword("test@gmail.com", "Password@123");
  await new Promise((r) => setTimeout(r, 2000));
  const loginButton = await screen.findByRole("button", { name: "Login Now" });
  fireEvent.click(loginButton);
});

test("should render ChangePassword correctly and simulate icon clicks and button click", async () => {
  const password = await screen.findByPlaceholderText("Enter new password");
  fireEvent.change(password, { target: { value: "Password@123" } });
  const reEnteredPassword = await screen.findByPlaceholderText(
    "Confirm password"
  );
  fireEvent.change(reEnteredPassword, { target: { value: "Password@123" } });

  const iconClick = await screen.findAllByRole("img");
  iconClick.forEach((icon) => {
    fireEvent.click(icon);
  });

  const changeButton = await screen.findByRole("button");
  fireEvent.click(changeButton);
});
