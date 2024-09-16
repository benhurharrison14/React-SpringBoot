import React from "react";
import ResetEmailSent from ".";
import { render } from "@testing-library/react";

test("should render PasswordSuccesful correctly", () => {
  render(<ResetEmailSent resetEmail={false} />);
});

test("should render resetEmailSent correctly", () => {
  render(<ResetEmailSent resetEmail={true} email="johndoe@gmail.com" />);
});
