import React from "react";
import { StoryFn, Meta } from "@storybook/react";
import { SideNavBar } from ".";

export default {
  title: "Organisms/SideNavBar",
  component: SideNavBar,
  argTypes: {},
} as Meta;

const Template: StoryFn<typeof SideNavBar> = () => <SideNavBar homeButton />;

export const Default = Template.bind({});
