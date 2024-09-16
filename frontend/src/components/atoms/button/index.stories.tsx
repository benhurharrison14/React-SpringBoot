import { Meta, StoryObj } from "@storybook/react";
import Button from ".";
import SeederTypography from "../typography";
import React from "react";
import theme from "../../../utils/themes";
import SeederIcons from "../icon";
import google from "../../../../public/images/google.svg";
import { SUMMARY_SLIDER_RESET_BUTTON } from "../../../utils/constants";
import leftArrow from "../../../../public/images/arrow-left.svg";

const meta: Meta<typeof Button> = {
  title: "atoms/Button",
  component: Button,
  argTypes: {
    onClick: { action: "Button clicked" },
  },
};

export default meta;

type story = StoryObj<typeof Button>;

export const Contained: story = {
  args: {
    children: <SeederTypography text="Review your credit" variant="button1" />,
    variant: "contained",
    backgroundColor: theme.palette.purple[500],
    sx: {
      padding: "20px 40px",
      borderRadius: "12px",
      width: "276px",
    },
  },
};

export const DisabledButton: story = {
  args: {
    children: <SeederTypography text="Review your credit" variant="button1" />,
    variant: "contained",
    disabled: true,
    backgroundColor: theme.palette.purple[500],
    sx: {
      padding: "20px 40px",
      borderRadius: "12px",
      width: "276px",
      "&.Mui-disabled": {
        color: theme.palette.white[500],
        backgroundColor: theme.palette.purple[500],
        opacity: "56%",
      },
    },
  },
};

export const ClearButton: story = {
  args: {
    children: <SeederTypography text="Clear" variant="button1" />,
    variant: "contained",
    backgroundColor: theme.palette.background.elevation2,
    sx: {
      padding: "20px 40px",
      borderRadius: "12px",
      width: "133px",
    },
  },
};

export const ForgotPassword: story = {
  args: {
    children: <SeederTypography text="Forgot Password?" variant="button1" />,
    variant: "text",
    backgroundColor: "transparent",
    sx: {
      color: theme.palette.purple[400],
    },
  },
};

export const GoogleLogin: story = {
  args: {
    children: <SeederTypography text="Google" variant="button1" />,
    variant: "outlined",
    backgroundColor: theme.palette.background.elevation1,
    startIcon: <SeederIcons src={google} alt={"google icon"} />,
    sx: {
      display: "flex",
      flexDirection: "column",
      width: "129.67px",
      height: "96px",
      padding: "20px 40px",
      borderRadius: "12px",
      gap: "8px",
      justifyContent: "center",
      "& .MuiButton-startIcon": {
        margin: 0,
      },
      border: "0px",
      color: theme.palette.white[500],
    },
  },
};

export const ResetButton: story = {
  args: {
    children: (
      <SeederTypography variant="button1" text={SUMMARY_SLIDER_RESET_BUTTON} />
    ),
    variant: "outlined",
    backgroundColor: theme.palette.background.elevation2,
    sx: {
      color: theme.palette.textColor.medemp,
      borderRadius: "12px",
      padding: "6px 12px",
      border: "0px",
    },
  },
};

export const BackButton: story = {
  args: {
    children: <SeederTypography variant="button1" text={"Back"} />,
    variant: "outlined",
    backgroundColor: theme.palette.background.elevation2,
    sx: {
      color: theme.palette.textColor.highemp,
      border: `1px solid ${theme.palette.border.lowemp}`,
      borderRadius: "12px",
      padding: "6px 12px",
    },
    startIcon: <SeederIcons src={leftArrow} alt={"Left Arrow"} />,
  },
};
