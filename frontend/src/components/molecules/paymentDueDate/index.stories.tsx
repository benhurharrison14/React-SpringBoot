import { Meta, StoryObj } from "@storybook/react";
import PaymentDueDate from ".";
import receipt from "../../../../public/images/receipt.svg";
import circularProgress from "../../../../public/images/circularProgress.svg";
import theme from "../../../utils/themes";
import {
  DUE_AMOUNT_CONTENT,
  DUE_AMOUNT_FOOTER_TEXT,
  OUTSATNDING_AMOUNT_CONTENT,
  OUTSTANDING_AMOUNT_FOOTER_TEXT,
} from "../../../utils/constants";

const meta: Meta<typeof PaymentDueDate> = {
  title: "molecules/PaymentDueDate",
  component: PaymentDueDate,
};

export default meta;

type story = StoryObj<typeof PaymentDueDate>;

export const DueAmount: story = {
  args: {
    dueDateState: true,
    iconSrc: receipt,
    iconAltText: "receipt icon",
    sx: {
      width: "80px",
      height: "80px",
      padding: "20px",
      borderRadius: "12px",
      backgroundColor: theme.palette.gray[100],
      border: `1px solid ${theme.palette.border.lowemp}`,
    },
    typographyText: DUE_AMOUNT_CONTENT,
    footerText: DUE_AMOUNT_FOOTER_TEXT,
  },
};

export const OutstandingAmount: story = {
  args: {
    dueDateState: false,
    iconSrc: circularProgress,
    iconAltText: "circular progress icon",
    typographyText: OUTSATNDING_AMOUNT_CONTENT,
    footerText: OUTSTANDING_AMOUNT_FOOTER_TEXT,
  },
};
