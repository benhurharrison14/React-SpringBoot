import { Card, styled } from "@mui/material";
import React, { useEffect, useState } from "react";
import SeederTypography from "../../atoms/typography";
import {
  NEW_CASHKICK_BUTTON,
  NEW_CASHKICK_HEADER,
  NEW_CASHKICK_LEFT_CONTENT,
  NEW_CASHKICK_RIGHT_CONTENT,
  replaceNumberWithCommas,
} from "../../../utils/constants";
import theme from "../../../utils/themes";
import Button from "../../atoms/button";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../../context";

interface NewCashKickProps {
  creditBalance: number;
}

const CustomCard = styled(Card)({
  maxWidth: "515px",
  minHeight: "257px",
  borderRadius: "12px",
  display: "flex",
  padding: "32px",
  gap: "20px",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  backgroundColor: theme.palette.background.elevation1,
  ".credit-balance": {
    color: theme.palette.textColor.medemp,
    fontWeight: 700,
  },
  border: `1px solid ${theme.palette.border.lowemp}`,
});

const StyledButton = styled(Button)({
  padding: "20px 40px",
  borderRadius: "12px",
  width: "100%",
  maxHeight: "59px",
  "&.Mui-disabled": {
    color: theme.palette.white[500],
    backgroundColor: theme.palette.purple[500],
    opacity: "56%",
  },
});

const NewCashKick = ({ ...props }: NewCashKickProps) => {
  const [balance, setBalance] = useState<number>(0);
  const navigate = useNavigate();

  const handleNewCashKick = () => {
    navigate("/new-cashkick");
  };

  const { creditBalance } = useAppContext();

  useEffect(() => {
    setBalance(creditBalance);
  }, [creditBalance]);

  return (
    <CustomCard>
      <SeederTypography
        variant="heading1"
        text={NEW_CASHKICK_HEADER}
        sx={{
          color: theme.palette.textColor.highemp,
          paddingRight: "15%",
        }}
      />
      <SeederTypography
        variant="body1"
        text={
          <>
            <span>{NEW_CASHKICK_LEFT_CONTENT}</span>
            <span className="credit-balance">
              ${replaceNumberWithCommas(props.creditBalance)}
            </span>
            <span>{NEW_CASHKICK_RIGHT_CONTENT}</span>
          </>
        }
        sx={{ color: theme.palette.textColor.lowemp }}
      />
      <StyledButton
        variant="contained"
        backgroundColor={theme.palette.purple[500]}
        disabled={balance <= 10}
        onClick={handleNewCashKick}
      >
        <SeederTypography variant="button1" text={NEW_CASHKICK_BUTTON} />
      </StyledButton>
    </CustomCard>
  );
};

export default NewCashKick;
