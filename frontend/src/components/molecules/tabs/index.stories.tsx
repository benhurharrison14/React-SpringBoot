import type { Meta, StoryObj } from "@storybook/react";
import SeederTabs from ".";
import SeederTypography from "../../atoms/typography";
import React from "react";
const meta = {
  title: "Molecules/Tabs",
  component: SeederTabs,
} satisfies Meta<typeof SeederTabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    contractContent: <SeederTypography variant="body1" text="My Contracts"/>,
    myCashKickContent: <SeederTypography variant="body1" text="My Cash Kick"/>
  },
};
