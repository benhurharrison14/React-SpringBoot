import React from "react";
import { StoryFn, Meta } from "@storybook/react";
import Image from ".";
import Login from "../../../../public/images/login-panel.png";

export default {
  title: "Atoms/Image",
  component: Image,
} as Meta;

const Template: StoryFn<typeof Image> = (args) => <Image {...args} />;

export const LoginImage = Template.bind({});
LoginImage.args = {
  src: Login,
  style: {
    width: "575px",
    height: "779px",
  },
};
