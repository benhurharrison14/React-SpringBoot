import { styled } from "@mui/system";
import React from "react";
import SeederTypography from "../../atoms/typography";
import SeederIcons from "../../atoms/icon";
import CrossIcon from "../../../../public/images/cross.svg";
import theme from "../../../utils/themes";
import Image from "../../atoms/image";
import CashkickLoader from "../../../../public/images/cashKickSuccess.gif";
import {
  CASH_KICK_LAUNCH_TEXT,
  CASH_KICK_LOADER_ALT,
  CASH_KICK_REVIEW_MAIN_TEXT,
  CASH_KICK_REVIEW_TEXT,
  CASH_KICK_UNDER_REVIEW_TEXT,
  CLOSE_BTN_ALT,
  CROSS_ICON_ALT,
  VIEW_CASH_KICK_ALT,
} from "../../../utils/constants";
import Button from "../../atoms/button";

export const CashKickMainContainer = styled("div")({
  width: "640px",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  borderRadius: "12px",
  border: `1px solid ${theme.palette.border.lowemp}`,
  background: theme.palette.gray[100],
  // width: "100%",
});

const HeadContainer = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "8px",
  alignSelf: "stretch",
  padding: "24px 40px",
});

const TypographyContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  maxWidth: "520px",
  maxHeight: "65px",
  gap: "4px",
  alignItems: "flex-start",
  width: "100%",
});

const BodyContainer = styled("div")({
  display: "flex",
  padding: "24px 40px",
  flexDirection: "column",
  alignContent: "flex-start",
  gap: "32px",
  alignSelf: "stretch",
  alignItems: "center",
});

const BodyTypographyContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  alignItems: "center",
});

const FooterContainer = styled("div")({
  display: "flex",
  padding: "32px 40px 24px 40px",
  alignItems: "center",
  gap: "8px",
  width: "100%",
  justifyContent: "flex-end",
});

const ButtonSx = {
  display: "flex",
  height: "60px",
  padding: "20px 40px",
  justifyContent: "center",
  alignItems: "center",
  gap: "8px",
  borderRadius: "12px",
};

export interface ICashKickSuccessProps {
  handleCrossIcon?: React.MouseEventHandler<HTMLImageElement>;
  handleCancelButton?: React.MouseEventHandler<HTMLButtonElement>;
  handleViewCashKickButton?: React.MouseEventHandler<HTMLButtonElement>;
}

const CashKickSuccess = ({
  handleCrossIcon,
  handleCancelButton,
  handleViewCashKickButton,
}: ICashKickSuccessProps) => {
  return (
    <CashKickMainContainer>
      <HeadContainer>
        <TypographyContainer>
          <SeederTypography
            variant="heading1"
            text={CASH_KICK_LAUNCH_TEXT}
            sx={{ color: theme.palette.textColor.highemp }}
          />
          <SeederTypography
            variant="heading3"
            text={CASH_KICK_REVIEW_TEXT}
            sx={{ color: theme.palette.textColor.lowemp }}
          />
        </TypographyContainer>
        <SeederIcons
          src={CrossIcon}
          alt={CROSS_ICON_ALT}
          onClick={handleCrossIcon}
        />
      </HeadContainer>
      <BodyContainer>
        <Image
          src={CashkickLoader}
          alt={CASH_KICK_LOADER_ALT}
          style={{ maxWidth: "172px", maxHeight: "172px", display: "flex" }}
        />
        <BodyTypographyContainer>
          <SeederTypography
            variant="heading2"
            text={CASH_KICK_UNDER_REVIEW_TEXT}
            style={{ color: theme.palette.textColor.highemp }}
          />
          <SeederTypography
            variant="body1"
            text={CASH_KICK_REVIEW_MAIN_TEXT}
            style={{
              color: theme.palette.textColor.lowemp,
              textAlign: "center",
            }}
          />
        </BodyTypographyContainer>
      </BodyContainer>
      <FooterContainer>
        <Button
          sx={{
            ...ButtonSx,
            background: theme.palette.background.elevation2,
          }}
          onClick={handleCancelButton}
        >
          <SeederTypography
            variant="button1"
            text={CLOSE_BTN_ALT}
            sx={{ color: theme.palette.textColor.medemp }}
          />
        </Button>
        <Button
          backgroundColor={theme.palette.purple[500]}
          sx={{ ...ButtonSx }}
          onClick={handleViewCashKickButton}
        >
          <SeederTypography
            variant="button1"
            text={VIEW_CASH_KICK_ALT}
            sx={{ color: theme.palette.white[500] }}
          />
        </Button>
      </FooterContainer>
    </CashKickMainContainer>
  );
};

export default CashKickSuccess;
