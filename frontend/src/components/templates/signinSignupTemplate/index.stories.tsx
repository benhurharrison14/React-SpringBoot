import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import SigninSignupTemplate from ".";
import Login from "../../organisms/login";
import login from "../../../../public/images/login-panel.png"

const meta:Meta<typeof SigninSignupTemplate> = {
    title:"templates/SigninSignupTemplate",
    component:SigninSignupTemplate
}

export default meta;

type story = StoryObj<typeof SigninSignupTemplate>;

export const LoginTemplate : story = {
    args:{
        bodyNode:<Login signup={false}/>,
        imageSrc:login
    }
}