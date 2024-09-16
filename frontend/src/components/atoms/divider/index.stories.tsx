import type { Meta, StoryObj } from "@storybook/react";
import SeederDivider from ".";
import theme from "../../../utils/themes";
import SeederTypography from "../typography";
import React from "react";
const meta = {
  title: "Atoms/Divider",
  component: SeederDivider,
} satisfies Meta<typeof SeederDivider>;

export default meta;
type Story = StoryObj<typeof meta>;

const typographySx: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "4px 8px",
  gap: "10px",
  color: `${theme.palette.textColor.medemp}`,
};
export const Login: Story = {
  args: {
    type: "login",
    sx: {
      width: "432px",
      color: `${theme.palette.border.highemp}`
    },
  },
};

export const Summary: Story = {
  args: {
    type: "summary",
    sx: {
      width: "432px",
      color: `${theme.palette.border.highemp}`,
    },
    children: <SeederTypography variant="body2" text="Or" sx={typographySx} />,
  },
};
