import React from "react";
import { StoryFn, Meta } from "@storybook/react";
import { ChangePassowrd } from ".";

export default {
  title: "Organisms/ChangePassword",
  component: ChangePassowrd,
} as Meta;

const Template: StoryFn<typeof ChangePassowrd> = () => <ChangePassowrd />;

export const Default = Template.bind({});
