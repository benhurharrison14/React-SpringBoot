import { Meta, StoryObj } from "@storybook/react";
import NewCashKick from ".";

const meta: Meta<typeof NewCashKick> = {
  title: "molecules/NewCashKick",
  component: NewCashKick,
};

export default meta;

type story = StoryObj<typeof NewCashKick>;

export const CreateCashKick: story = {
  args: {
    creditBalance: 709546,
  },
};
