import type { Meta, StoryObj } from "@storybook/react";
import SeederIcons from ".";
import CalendarIcon from "../../../../public/images/calendar.svg";
const meta = {
  title: "Atoms/Icons",
  component: SeederIcons,
} satisfies Meta<typeof SeederIcons>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    src: CalendarIcon,
    alt: "Google Icon Alt",
  },
};
