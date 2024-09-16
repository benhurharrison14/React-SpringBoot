import { Box, Card, SxProps } from "@mui/material";
import React from "react";
import theme from "../../../utils/themes";
import SeederTypography from "../../atoms/typography";
import SeederIcons from "../../atoms/icon";
import IconLabel from "../iconLabel";
import moreInfo from "../../../../public/images/moreInfo.svg";
import { PAYMENT_DUE_DATE } from "../../../utils/constants";
import styled from "@emotion/styled";

interface PaymentDueDateProps {
  dueDateState: boolean;
  iconSrc: string;
  iconAltText: string;
  sx?: SxProps;
  typographyText: string;
  footerText: string;
}

const CustomCard = styled(Card)({
  maxWidth: "515px",
  minHeight: "259px",
  borderRadius: "12px",
  padding: "32px",
  gap: "8px",
  display: "flex",
  flexDirection: "column",
  border: `1px solid ${theme.palette.border.lowemp}`,
  backgroundColor: theme.palette.background.elevation1,
  width: "100%",
});

const TypographySx = {
  backgroundColor: theme.palette.accent.pink,
  color: theme.palette.background.elevation1,
  borderRadius: "4px",
  padding: "4px 8px",
  maxWidth: "123px",
  alignSelf: "flex-end",
};

const PaymentDueDate = ({ ...props }: PaymentDueDateProps) => {
  return (
    <CustomCard>
      {props.dueDateState ? (
        <SeederTypography
          variant="body2"
          text={PAYMENT_DUE_DATE}
          sx={TypographySx}
        />
      ) : (
        <Box sx={{ minHeight: "13px" }} />
      )}
      <Box sx={props.sx}>
        <SeederIcons src={props.iconSrc} alt={props.iconAltText} />
      </Box>
      <IconLabel
        typographyVariant="body1"
        typographyText={props.typographyText}
        typographySx={{ color: theme.palette.textColor.medemp }}
        iconSrc={moreInfo}
        iconAltText={"more info icon"}
        iconFirst={false}
        sx={{ alignSelf: "flex-start", gap: "8px", paddingTop: "4.5%" }}
      />
      <SeederTypography
        variant="heading2"
        sx={{ color: theme.palette.textColor.highemp }}
        text={props.footerText}
      />
    </CustomCard>
  );
};

export default PaymentDueDate;
