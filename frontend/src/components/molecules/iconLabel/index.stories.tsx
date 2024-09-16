import { Meta, StoryObj } from "@storybook/react";
import IconLabel from ".";
import accelerationIcon from "../../../../public/images/accelerationIcon.svg"
import theme from "../../../utils/themes";
import logout from ".././../../../public/images/logoutIcon.svg"
import moreInfo from "../../../../public/images/moreInfo.svg"
import { iconLabelStyles } from "../../../utils/constants";

const meta:Meta<typeof IconLabel> = {
    title:"molecules/IconLabel",
    component:IconLabel
}

export default meta

type story = StoryObj<typeof IconLabel>

export const CashAcceleration:story = {
    args:{
        typographyText:"Cash Acceleration",
        typographyVariant:"button2",
        iconSrc:accelerationIcon,
        iconAltText:"acceleration icon",
        iconFirst:true,
        sx:iconLabelStyles,
        typographySx:{
            color:theme.palette.textColor.lowemp
        }
    }
}

export const LogoutLabel : story = {
    args:{
        typographyText:"Logout",
        typographyVariant:"button2",
        typographySx:{
            color:theme.palette.accent.red
        },
        iconSrc:logout,
        iconAltText:"logout icon",
        iconFirst: true,
        sx:iconLabelStyles
    }
}

export const PaymentsHeader : story = {
    args:{
        typographyText:"Your payments",
        typographyVariant:"heading2",
        typographySx:{
            color:theme.palette.textColor.highemp
        },
        iconSrc:moreInfo,
        iconAltText:"information icon",
        iconFirst: false,
        sx:{
            gap:"8px"
        }
    },
}