import { Meta, StoryObj } from "@storybook/react";
import Avatar from ".";
import avatar from "../../../../public/images/profile.svg"

const meta: Meta<typeof Avatar> = {
    title:"atoms/Avatar",
    component:Avatar
}

export default meta;

type story = StoryObj<typeof Avatar>;

export const ProfileAvatar : story = {
    args:{
        src:avatar,
        alt:"profile avatar",
        sx:{
            borderRadius:"12px",
            width:"32px",
            height:"32px"
        }
    }
}