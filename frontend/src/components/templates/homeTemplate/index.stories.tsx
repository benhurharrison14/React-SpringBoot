import { Meta, StoryObj } from "@storybook/react";
import HomeTemplate from ".";
import Header from "../../organisms/header";
import React from "react";
import PaymentDueDate from "../../molecules/paymentDueDate";
import receipt from "../../../../public/images/receipt.svg";
import circularProgress from "../../../../public/images/circularProgress.svg";
import moreInfo from "../../../../public/images/moreInfo.svg";
import LeftArrow from "../../../../public/images/arrow-left.svg";
import {
  DUE_AMOUNT_CONTENT,
  DUE_AMOUNT_FOOTER_TEXT,
  OUTSATNDING_AMOUNT_CONTENT,
  OUTSTANDING_AMOUNT_FOOTER_TEXT,
  cashAccelerationColumns,
  cashAcclerationRows,
} from "../../../utils/constants";
import theme from "../../../utils/themes";
import NewCashKick from "../../molecules/newCashKick";
import SeederDataGrid from "../../organisms/dataGrid";
import IconLabel from "../../molecules/iconLabel";
import SeederChip from "../../atoms/chips";
import SeederIcons from "../../atoms/icon";
import SeederTypography from "../../atoms/typography";
import { Box } from "@mui/material";

const meta: Meta<typeof HomeTemplate> = {
  title: "Templates/HomeTemplate",
  component: HomeTemplate,
};

export default meta;

type story = StoryObj<typeof HomeTemplate>;
export const HomePage: story = {
  args: {
    headerContent: (
      <Header
        headerContent={"Good afternoon ✋"}
        headerFooter={"April 02, 2021"}
      />
    ),
    bodyContent: (
      <>
        <PaymentDueDate
          dueDateState={true}
          iconSrc={receipt}
          iconAltText="receipt icon"
          sx={{
            width: "80px",
            height: "80px",
            padding: "20px",
            borderRadius: "12px",
            backgroundColor: theme.palette.gray[100],
            border: `1px solid ${theme.palette.border.lowemp}`,
          }}
          typographyText={DUE_AMOUNT_CONTENT}
          footerText={DUE_AMOUNT_FOOTER_TEXT}
        />
        <PaymentDueDate
          dueDateState={false}
          iconSrc={circularProgress}
          iconAltText="circular progress icon"
          typographyText={OUTSATNDING_AMOUNT_CONTENT}
          footerText={OUTSTANDING_AMOUNT_FOOTER_TEXT}
        />
        <NewCashKick creditBalance={709546} />
      </>
    ),
  },
};

export const NewCashKickPage: story = {
  args: {
    headerContent: (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          width: "100%",
        }}
      >
        <Header
          headerContent={"Good afternoon ✋"}
          headerFooter={"April 02, 2021"}
        />
        <SeederChip
          label={
            <SeederTypography
              variant="body2"
              text="Back"
              sx={{ color: `${theme.palette.textColor.medemp}` }}
            />
          }
          variant="filled"
          sx={{
            padding: "6px 12px",
            gap: "8px",
            borderRadius: "12px",
            border: `1px solid ${theme.palette.border.lowemp}`,
            maxWidth: "100px",
            background: `${theme.palette.background.elevation1}`,
          }}
          icon={<SeederIcons src={LeftArrow} alt="Left Arrow" />}
        />
      </div>
    ),
    bodyContent: (
      <div>
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            flexDirection: "column",
            padding: "32px",
            gap: "20px",
            maxWidth: "55vw",
            maxHeight: "530px",
            background: theme.palette.background.elevation1,
            overflow: "auto",
            borderRadius: "12px",
            "&::-webkit-scrollbar": {
              width: "8px",
              height: "8px",
            },

            "&::-webkit-scrollbar-track": {
              background: theme.palette.background.elevation2,
              height: "8px",
              borderRadius: "4px",
              padding: "4px 3px",
            },

            "&::-webkit-scrollbar-thumb": {
              backgroundColor: theme.palette.icon.lowemp,
              borderRadius: "20px",
              height: "8px",
            },
          }}
        >
          <IconLabel
            typographySx={{ color: theme.palette.textColor.highemp }}
            typographyText="Your Contracts"
            typographyVariant="heading2"
            iconSrc={moreInfo}
            iconAltText="information icon"
            iconFirst={false}
            sx={{ gap: "8px" }}
          />
          <SeederDataGrid
            columns={cashAccelerationColumns}
            rows={cashAcclerationRows}
          />
        </Box>
      </div>
    ),
  },
};
