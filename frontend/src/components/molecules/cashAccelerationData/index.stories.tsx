import React from "react";
import { StoryFn, Meta } from "@storybook/react";
import { CashAccelerationData } from "./index";

export default {
  title: "Molecules/CashAccelerationData",
  component: CashAccelerationData,
} as Meta;

const Template: StoryFn<typeof CashAccelerationData> = (args) => (
  <CashAccelerationData {...args} />
);

export const Default = Template.bind({});
Default.args = {
  termCap: "12 Months",
  availableCredit: "$704.54k",
  maxInterestRate: "12.00%",
};
