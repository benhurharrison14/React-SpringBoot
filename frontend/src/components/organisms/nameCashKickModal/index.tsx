import { styled } from "@mui/material";
import React, { useState } from "react";
import theme from "../../../utils/themes";
import {
  CANCEL_BTN_ALT,
  CASH_KICK_NAME,
  CREATE_CASH_KICK,
  CROSS_ICON_ALT,
  IDENTIFY_CASH_KICK,
  NAME_CASH_KICK,
  NAME_CASH_KICK_PLACEHOLDER,
} from "../../../utils/constants";
import SeederIcons from "../../atoms/icon";
import SeederTypography from "../../atoms/typography";
import CrossIcon from "../../../../public/images/cross.svg";
import InputField from "../../atoms/inputfield";
import Button from "../../atoms/button";
import { CashKickMainContainer } from "../../molecules/cashKickSuccessModal";

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
  alignItems: "flex-start",
  gap: "8px",
  alignSelf: "stretch",
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

export interface INameCashKickProps {
  handleCrossIcon?: React.MouseEventHandler<HTMLImageElement>;
  handleCancelButton?: React.MouseEventHandler<HTMLButtonElement>;
  handleCreateCashKickButton?: React.MouseEventHandler<HTMLButtonElement>;
  setNameCashKick?: React.Dispatch<React.SetStateAction<string>>;
}

const NameCashKick = ({
  handleCrossIcon,
  handleCancelButton,
  handleCreateCashKickButton,
  setNameCashKick
}: INameCashKickProps) => {
  const [inputValue, setInputValue] = useState<string>("");


  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    setNameCashKick?.(event.target.value);
  };

  return (
    <CashKickMainContainer>
      <HeadContainer>
        <TypographyContainer>
          <SeederTypography
            variant="heading1"
            text={NAME_CASH_KICK}
            sx={{ color: theme.palette.textColor.highemp }}
          />
          <SeederTypography
            variant="heading3"
            text={IDENTIFY_CASH_KICK}
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
        <SeederTypography
          variant="body1"
          text={CASH_KICK_NAME}
          sx={{ color: theme.palette.textColor.lowemp }}
        />
        <InputField
          placeholder={NAME_CASH_KICK_PLACEHOLDER}
          value={inputValue}
          onChange={handleInputChange}
          createCashKick={true}
          sx={{
            gap: "12px",
            height: "56px",
            display: "flex",
            color: theme.palette.textColor.medemp,
          }}
        />
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
            text={CANCEL_BTN_ALT}
            sx={{ color: theme.palette.textColor.medemp }}
          />
        </Button>
        <Button
          sx={{
            ...ButtonSx,
            background: theme.palette.purple[500],
            "&.Mui-disabled": {
              color: theme.palette.white[500],
              backgroundColor: theme.palette.purple[500],
              opacity: "56%",
            },
          }}
          onClick={handleCreateCashKickButton}
          disabled={inputValue.length === 0}
          variant="contained"
          backgroundColor={theme.palette.purple[500]}
        >
          <SeederTypography
            variant="button1"
            text={CREATE_CASH_KICK}
            sx={{ color: theme.palette.white[500] }}
          />
        </Button>
      </FooterContainer>
    </CashKickMainContainer>
  );
};

export default NameCashKick;
