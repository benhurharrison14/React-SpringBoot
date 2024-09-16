import React from "react";
import { Box, styled } from "@mui/material";
import { CashAccelerationCard } from "../cashAccelerationCard";
import theme from "../../../utils/themes";
import calendar from "../../../../public/images/calendar.svg";
import credit from "../../../../public/images/available-credit.svg";
import interest from "../../../../public/images/interest-rate.svg";
import { CashAccelerationDataMolecule } from "../../../utils/constants";

interface CashAccelerationDataProps {
  termCap: string;
  availableCredit: string;
  maxInterestRate: string;
}
const StyledBox = styled(Box)({
  width: "57.5vw",
  minHeight: "257px",
  padding: "64px",
  borderRadius: "12px",
  backgroundColor: `${theme.palette.background.elevation1}`,
  border: `${theme.palette.border.lowemp}`,
  display: "flex",
  flexDirection: "row",
});

export const CashAccelerationData = ({
  termCap,
  availableCredit,
  maxInterestRate,
}: CashAccelerationDataProps) => {
  return (
    <StyledBox>
      <CashAccelerationCard
        iconSrc={calendar}
        cardHeading={CashAccelerationDataMolecule.termCap}
        cardData={termCap}
      />
      <CashAccelerationCard
        iconSrc={credit}
        cardHeading={CashAccelerationDataMolecule.availableCredit}
        cardData={availableCredit}
      />
      <CashAccelerationCard
        iconSrc={interest}
        cardHeading={CashAccelerationDataMolecule.interestRate}
        cardData={maxInterestRate}
      />
    </StyledBox>
  );
};
