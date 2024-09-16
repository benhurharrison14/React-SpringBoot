import React from "react";
import SeederTypography from "../../atoms/typography";
import SeederIcons from "../../atoms/icon";
import Icon from "../../../../public/images/info-icon.svg";
import styled from "@emotion/styled";
import { Box, Stack } from "@mui/material";
import theme from "../../../utils/themes";

interface CardComponentProps {
  iconSrc: string;
  cardHeading: string;
  cardData: string;
}

const MainContainer = styled(Box)({
  width: "16vw",
  height: "168px",
  backgroundColor: theme.palette.background.elevation1,
  padding: "0px 24px 24px 0px",
});

const TextContainer = styled(Box)({
  marginTop: "24px",
});

const IconContainer = styled(Box)({
  width: "80px",
  height: "80px",
  borderRadius: "12px",
  border: "1px",
  backgroundColor: theme.palette.gray[100],
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export const CashAccelerationCard = ({
  iconSrc,
  cardHeading,
  cardData,
}: CardComponentProps) => {
  return (
    <MainContainer>
      <IconContainer>
        <SeederIcons src={iconSrc} alt="MainIcon" />
      </IconContainer>
      <TextContainer>
        <Stack direction={"column"} spacing={2}>
          <Stack direction={"row"} spacing={1}>
            <SeederTypography
              text={cardHeading}
              variant="body1"
              color={theme.palette.textColor.medemp}
            />
            <SeederIcons src={Icon} alt="sideIcon" />
          </Stack>
          <SeederTypography
            text={cardData}
            variant="heading2"
            color={theme.palette.textColor.highemp}
          />
        </Stack>
      </TextContainer>
    </MainContainer>
  );
};
