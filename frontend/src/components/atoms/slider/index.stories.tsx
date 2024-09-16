import React from "react";
import { StoryFn, Meta } from "@storybook/react";
import CustomSlider from "./index";

export default {
  title: "Atoms/Slider",
  component: CustomSlider,
} as Meta;

const Template: StoryFn<typeof CustomSlider> = (args) => (
  <CustomSlider {...args} />
);

export const Default = Template.bind({});
Default.args = {
  value: 50,
  min: 0,
  max: 100,
};
