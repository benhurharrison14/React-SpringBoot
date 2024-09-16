import { Meta, StoryObj } from "@storybook/react";
import Header from ".";
import { CASH_ACCELERATION_CONTENT, CASH_ACCELERATION_FOOTER, HOME_HEADER_CONTENT, HOME_HEADER_FOOTER, NEW_CASHKICK_CONTENT, NEW_CASHKICK_FOOTER } from "../../../utils/constants";

const meta:Meta<typeof Header> = {
    title:"organisms/Header",
    component:Header
}

export default meta;

type story = StoryObj<typeof Header>

export const HomeHeader : story = {
    args:{
        headerContent : HOME_HEADER_CONTENT,
        headerFooter : HOME_HEADER_FOOTER
    }
}

export const CashAccelerationHeader : story = {
    args:{
        headerContent : CASH_ACCELERATION_CONTENT,
        headerFooter : CASH_ACCELERATION_FOOTER
    }
}
export const NewCashKickHeader : story = {
    args:{
        headerContent : NEW_CASHKICK_CONTENT,
        headerFooter : NEW_CASHKICK_FOOTER
    }
}