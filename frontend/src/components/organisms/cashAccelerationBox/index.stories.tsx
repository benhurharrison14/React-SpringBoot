import React from "react";
import { StoryFn, Meta } from "@storybook/react";
import { CashAccelerationBox } from ".";

export default {
  title: "Organisms/CashAccelerationBox",
  component: CashAccelerationBox,
} as Meta;

const Template: StoryFn<typeof CashAccelerationBox> = () => (
  <CashAccelerationBox />
);

export const Default = Template.bind({});
