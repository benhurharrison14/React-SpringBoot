import { Meta, StoryObj } from "@storybook/react";
import Checkbox from ".";
import React from "react";

const meta:Meta<typeof Checkbox> = {
    title : "atoms/Checkbox",
    component: Checkbox
}

export default meta;

type story = StoryObj<typeof Checkbox>

export const CheckBox: story = {
    render:() => {
        return <Checkbox/>
    }
}

export const IndeterminateIcon : story = {
    args:{
        indeterminate: true
    }
}