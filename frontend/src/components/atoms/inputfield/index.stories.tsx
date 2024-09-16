import React from "react";
import { StoryFn, Meta } from "@storybook/react";
import InputField from ".";
import { InputAdornment } from "@mui/material";
import eye from "../../../../public/images/eye.svg";
import visibleOff from "../../../../public/images/eye-slash.svg";
import lock from "../../../../public/images/lock.svg";

import SeederIcons from "../icon";
export default {
  title: "Atoms/InputField",
  component: InputField,
  argTypes: {
    type: {
      options: ['password', 'text'],
      control: { type: 'radio' },
    },
  },
} as Meta;

const Template: StoryFn<typeof InputField> = (args) => <InputField {...args} />;

export const PasswordVisibleTextField = Template.bind({});
PasswordVisibleTextField.args = {
  placeholder: "Enter password",
  sx: { width: "434px" },
  type: "text",
  inputProps: {
    endAdornment: (
      <InputAdornment position="start">
        <SeederIcons src={eye} alt="Image" />
      </InputAdornment>
    ),
  },
};

export const PasswordVisibleOffTextField = Template.bind({});
PasswordVisibleOffTextField.args = {
  placeholder: "Enter password",
  sx: { width: "434px" },
  type: "password",
  inputProps: {
    endAdornment: (
      <InputAdornment position="start">
        <SeederIcons src={visibleOff} alt="Image" />
      </InputAdornment>
    ),
  },
};

export const StartTextField = Template.bind({});
StartTextField.args = {
  placeholder: "Enter email address",
  sx: { width: "434px" },
  inputProps: {
    startAdornment: (
      <InputAdornment position="start">
        <SeederIcons src={lock} alt="Image" />
      </InputAdornment>
    ),
  },
};

export const UserNameTextField = Template.bind({});
UserNameTextField.args = {
  placeholder: "Johndoe",
  sx: { width: "434px" },
};
