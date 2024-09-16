import type { Meta, StoryObj } from "@storybook/react";
import EmptyCashAccleration from ".";
import SeederTypography from "../../atoms/typography";
import React from "react";
import theme from "../../../utils/themes";
import {
  CONNECTION_SUCCESS,
  CONNECT_NOW,
  CONNECT_PAYMENT,
  CONTACT_CUSTOMER,
  FAILED_CONNECTION,
  FAILED_CONTRACTS,
  FINANCE_PLANNING,
  LAUNCH_NEW_CASHKICK,
  NO_CASH_KICK,
  SUBSCRIPTION_PLATFORM,
} from "../../../utils/constants";
import Cheque from "../../../../public/images/cheque.svg";
import Warning from "../../../../public/images/3d-warning.svg";
import ConnectSuccessFul from "../../../../public/images/connectSuccessful.svg";
import FinancePlanning from "../../../../public/images/financePlanning.svg";

const meta = {
  title: "Molecules/EmptyCashAccleration",
  component: EmptyCashAccleration,
  argTypes: {
    handleButtonClick: { action: "Button Clicked" },
  },
} satisfies Meta<typeof EmptyCashAccleration>;

export default meta;
type Story = StoryObj<typeof meta>;

export const EmptyCashKick: Story = {
  args: {
    src: Cheque,
    alt: "Cheque Alt",
    text: LAUNCH_NEW_CASHKICK,
    button: true,
    children: (
      <SeederTypography
        variant="heading3"
        sx={{ color: theme.palette.textColor.lowemp }}
        text={NO_CASH_KICK}
      />
    ),
  },
};

export const FailedConnection: Story = {
  args: {
    src: Warning,
    alt: "Warning Alt",
    button: true,
    text: "Retry",
    children: (
      <>
        <SeederTypography
          variant="heading3"
          sx={{ color: "#FFF" }}
          text={FAILED_CONNECTION}
        />
        <SeederTypography
          variant="caption"
          sx={{ color: theme.palette.textColor.lowemp }}
          text={CONTACT_CUSTOMER}
        />
      </>
    ),
  },
};

export const ConnectedSuccessful: Story = {
  args: {
    src: ConnectSuccessFul,
    alt: CONNECTION_SUCCESS,
    children: (
      <SeederTypography
        variant="heading3"
        text={CONNECTION_SUCCESS}
        sx={{ color: theme.palette.textColor.highemp }}
      />
    ),
    button: false,
  },
};

export const ConnectPayment: Story = {
  args: {
    src: FinancePlanning,
    alt: FINANCE_PLANNING,
    button: true,
    text: CONNECT_NOW,
    children: (
      <div
        style={{
          display: "flex",
          gap: "4px",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <SeederTypography
          variant="heading3"
          sx={{ color: theme.palette.textColor.lowemp }}
          text={CONNECT_PAYMENT}
        />
        <SeederTypography
          variant="heading3"
          sx={{ color: theme.palette.textColor.lowemp }}
          text={SUBSCRIPTION_PLATFORM}
        />
      </div>
    ),
  },
};

export const FailedContracts: Story = {
  args: {
    src: Warning,
    alt: "Warning Alt",
    button: true,
    text: "Retry",
    children: (
      <>
        <SeederTypography
          variant="heading3"
          sx={{ color: "#FFF" }}
          text={FAILED_CONTRACTS}
        />
        <SeederTypography
          variant="caption"
          sx={{ color: theme.palette.textColor.lowemp }}
          text={CONTACT_CUSTOMER}
        />
      </>
    ),
  },
};
