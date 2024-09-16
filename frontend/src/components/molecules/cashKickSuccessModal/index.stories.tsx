import type { Meta, StoryObj } from "@storybook/react";
import CashKickSuccess from ".";

const meta = {
  title: "Molecules/CashKickSuccess",
  component: CashKickSuccess,
  argTypes:{
    handleCancelButton: {action: 'clicked Cancel Button'},
    handleCrossIcon: {action: 'clicked Cross Icon'},
    handleViewCashKickButton: {action: 'clicked View Cash Kick Button'},
  }
} satisfies Meta<typeof CashKickSuccess>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    
  },
};
