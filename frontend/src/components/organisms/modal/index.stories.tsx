import { Meta, StoryObj } from "@storybook/react";
import Modal from ".";
import NameCashKick from "../nameCashKickModal";
import React from "react";
import CashKickSuccess from "../../molecules/cashKickSuccessModal";
import { action } from "@storybook/addon-actions";

const meta: Meta<typeof Modal> = {
  title: "organisms/Modal",
  component: Modal,
  argTypes: {},
};

export default meta;

type story = StoryObj<typeof Modal>;

export const NameCashKickModal: story = {
  args: {
    modalOpen: true,
    children: (
      <NameCashKick
        handleCancelButton={action("button clicked")}
        handleCreateCashKickButton={action("Create Cash Kick clicked")}
        handleCrossIcon={action("Cross Button clicked")}
      />
    ),
  },
};

export const CashKickSuccessModal: story = {
  args: {
    modalOpen: true,
    children: (
      <CashKickSuccess
        handleCancelButton={action("Cancel button clicked")}
        handleCrossIcon={action("Cross Icon clicked")}
        handleViewCashKickButton={action("View button clicked")}
      />
    ),
  },
};
