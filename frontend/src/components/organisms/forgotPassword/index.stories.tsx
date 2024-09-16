import React from "react";
import { StoryFn, Meta } from "@storybook/react";
import { ForgotPassowrd } from ".";
import emailIDIcon from "../../../../public/images/forgotPassword.svg";
import resetIcon from "../../../../public/images/resetPassword.svg";
import { ForgotPasswordStories } from "../../../utils/constants";

export default {
  title: "Organisms/ForgotPassword",
  component: ForgotPassowrd,
  argTypes: {
    handleLogin: { action: "Clicked on Login" },
    handleReset: { action: "Clicked On Reset Button" },
  },
} as Meta;

const Template: StoryFn<typeof ForgotPassowrd> = (args) => (
  <ForgotPassowrd {...args} />
);

export const ForgotPassowrdBox = Template.bind({});
ForgotPassowrdBox.args = {
  successful: false,
  bodyMessage: ForgotPasswordStories.ForgotPasswordBoxBodyMessage,
  heading: ForgotPasswordStories.ForgotPasswordBoxHeding,
  placeholderText: ForgotPasswordStories.ForgotPasswordBoxPlaceHolder,
  iconSrc: emailIDIcon,
};

export const ResetPasswordBox = Template.bind({});
ResetPasswordBox.args = {
  successful: false,
  bodyMessage: ForgotPasswordStories.ResetPasswordBoxBodyMessage,
  heading: ForgotPasswordStories.ResetPasswordBoxHeading,
  placeholderText: ForgotPasswordStories.ResetPasswordBoxHeading,
  iconSrc: resetIcon,
};

export const ResetSuccessfulBox = Template.bind({});
ResetSuccessfulBox.args = {
  successful: true,
  heading: ForgotPasswordStories.ResetSuccessfulBoxHeading,
  bodyMessage: ForgotPasswordStories.ForgotPasswordBoxBodyMessage,
  resetEmail: ForgotPasswordStories.ResetSuccessfulBoxEmail,
  iconSrc: "",
};
