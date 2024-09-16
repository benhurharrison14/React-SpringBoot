import { Meta, StoryObj } from "@storybook/react";
import Summary from ".";
import { SLIDER_MAX_AMOUNT, SUMMARY_TERM_DURATION } from "../../../utils/constants";

const meta:Meta<typeof Summary> = {
    title:"organisms/Summary",
    component:Summary
}

export default meta;

type story = StoryObj<typeof Summary>

export const SummaryCard :  story = {
    args:{
        selectedContracts:2,
        slider: true,
        termDuration:SUMMARY_TERM_DURATION,
        maxSliderAmount:SLIDER_MAX_AMOUNT,
        value:12000
    }
}

export const SummarySubmitCard : story = {
    args:{
        selectedContracts:2,
        slider:false,
        sliderAmount:234542.45,
        termDuration:SUMMARY_TERM_DURATION,
        maxSliderAmount:SLIDER_MAX_AMOUNT
    }
}