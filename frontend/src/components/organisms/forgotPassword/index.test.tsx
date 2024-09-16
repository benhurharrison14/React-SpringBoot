import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { ForgotPassowrd } from ".";
import emailIDIcon from "../../../../public/images/forgotPassword.svg";

test("should render ChangePassword correctly", async () => {
  render(
    <ForgotPassowrd
      successful={false}
      heading={"Forgot Password"}
      placeholderText="Enter email id"
      iconSrc={emailIDIcon}
    />
  );

  const email = await screen.findByPlaceholderText("Enter email id");
  fireEvent.change(email, { target: { value: "johndoe@gmail.com" } });
  const emailBox = await screen.findByPlaceholderText("Enter email id");
  fireEvent.change(emailBox, { target: { value: "" } });
});

test("should render ChangePassword correctly", async () => {
  render(
    <ForgotPassowrd
      successful={false}
      heading={"Enter Reset Code"}
      placeholderText="Enter Reset Code"
      iconSrc={emailIDIcon}
    />
  );

  const email = await screen.findByPlaceholderText("Enter Reset Code");
  fireEvent.change(email, { target: { value: "145625" } });
  const emailBox = await screen.findByPlaceholderText("Enter Reset Code");
  fireEvent.change(emailBox, { target: { value: "" } });
});

test("should render ChangePassword correctly", async () => {
  render(
    <ForgotPassowrd
      successful={true}
      heading={"Forgot Password"}
      iconSrc={emailIDIcon}
      resetEmail="johndoe@gmail.com"
      placeholderText={"Enter Email id"}
    />
  );
});
