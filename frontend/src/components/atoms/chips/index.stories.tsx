import type { Meta, StoryObj } from "@storybook/react";
import SeederChip from ".";
import SeederTypography from "../typography";
import React from "react";
import theme from "../../../utils/themes";

const meta = {
  title: "Atoms/Chips",
  component: SeederChip,
} satisfies Meta<typeof SeederChip>;

export default meta;
type Story = StoryObj<typeof meta>;


export const Status: Story = {
  args: {
    label: (
      <SeederTypography
        variant="body2"
        text="Pending"
        sx={{ color: `${theme.palette.textColor.medemp}` }}
      />
    ),
    variant: "filled",
    sx: {
      padding: "4px 8px",
      gap: "10px",
      borderRadius: "4px",
      maxWidth: "101px",
      background: `${theme.palette.background.elevation2}`,
      width:"70px",
      height:"25px"
    },
  },
};
