import React from "react";
import { StoryFn, Meta } from "@storybook/react";
import { CashAccelerationCard } from "./index";
import calendar from "../../../../public/images/calendar.svg";

export default {
  title: "Molecules/CashAccelerationCard",
  component: CashAccelerationCard,
} as Meta;

const Template: StoryFn<typeof CashAccelerationCard> = (args) => (
  <CashAccelerationCard {...args} />
);

export const TermCapCard = Template.bind({});
TermCapCard.args = {
  iconSrc: calendar,
  cardHeading: "Term Cap",
  cardData: "12 Months",
};
