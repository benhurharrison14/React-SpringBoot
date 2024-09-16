import { Meta, StoryObj } from "@storybook/react";
import LogoutScreen from ".";
import { LOGOUT_DROPDOWN_USER_NAME } from "../../../utils/constants";

const meta: Meta<typeof LogoutScreen> = {
  title: "organisms/LogoutDropdown",
  component: LogoutScreen,
};

export default meta;

type story = StoryObj<typeof LogoutScreen>;

export const LogoutDropdown: story = {
  args: {
    userName: LOGOUT_DROPDOWN_USER_NAME,
    dropdownPosition:true
  },
};
