import type { Meta, StoryObj } from "@storybook/react";
import NameCashKick from ".";

const meta = {
    title: "Organisms/NameCashKick",
    component: NameCashKick,
    argTypes: {
        handleCrossIcon: {action: "clicked on Cross Icon"},
        handleCancelButton: {action: "clicked on Cancel Icon"},
        handleCreateCashKickButton: {action: "clicked on Create Cash Kick Button"},
    }
} satisfies Meta<typeof NameCashKick>;

export default meta;
type Story = StoryObj<typeof meta>

export const Primary: Story = {

}