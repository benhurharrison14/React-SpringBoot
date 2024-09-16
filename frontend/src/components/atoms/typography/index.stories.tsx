import type { Meta, StoryObj } from "@storybook/react";
import SeederTypograpy from ".";
const meta = {
  title: "Atoms/Typography",
  component: SeederTypograpy,
} satisfies Meta<typeof SeederTypograpy>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    text: "seeder",
    variant: "h1"
  },
};
