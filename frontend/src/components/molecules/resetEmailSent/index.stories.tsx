import React from "react";
import { StoryFn, Meta } from "@storybook/react";
import ResetEmailSent from "./index";

export default {
  title: "Molecules/ResetEmailSent",
  component: ResetEmailSent,
} as Meta;

const Template: StoryFn<typeof ResetEmailSent> = (args) => (
  <ResetEmailSent {...args} />
);

export const ResetEmail = Template.bind({});
ResetEmail.args = {
  resetEmail: true,
  email: "johndoe@gmail.com",
};

export const PasswordSuccessful = Template.bind({});
PasswordSuccessful.args = {
  resetEmail: false,
};
