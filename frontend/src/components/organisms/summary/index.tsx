import { Box, Card, styled } from "@mui/material";
import IconLabel from "../../molecules/iconLabel";
import React from "react";
import {
  SUMMARY_CARD_INFO,
  SUMMARY_HEADER_CONTENT,
  SUMMARY_PAY_BACK_AMOUNT,
  SUMMARY_RATE_PERCENT,
  SUMMARY_RATE_VALUE,
  SUMMARY_REVIEW_CREDIT_BUTTON,
  SUMMARY_SLIDER_HEADER,
  SUMMARY_SLIDER_RESET_BUTTON,
  SUMMARY_SLIDER_SELECTED_OF,
  SUMMARY_SUBMIT_CREDIT_BUTTON,
  SUMMARY_TOTAL_PAYOUT,
  replaceNumberWithCommas,
} from "../../../utils/constants";
import moreInfo from "../../../../public/images/moreInfo.svg";
import theme from "../../../utils/themes";
import SeederTypography from "../../atoms/typography";
import CustomSlider from "../../atoms/slider";
import SeederDivider from "../../atoms/divider";
import Button from "../../atoms/button";

interface SummaryProps {
  selectedContracts: number;
  slider: boolean;
  sliderAmount?: number;
  termDuration: number;
  maxSliderAmount: number;
  value: number;
  setValue?: React.Dispatch<React.SetStateAction<number>>;
  onHandleSlider: (event: Event, value: number | number[]) => void;
  onHandleResetBtn: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  handleReview?: React.MouseEventHandler<HTMLButtonElement>;
  handleSubmit?: React.MouseEventHandler<HTMLButtonElement>;
}

const StyledCard = styled(Card)({
  overflow: "auto",
  maxWidth: "380px",
  borderRadius: "12px",
  padding: "32px",
  display: "flex",
  gap: "20px",
  flexDirection: "column",
  width: "100%",
  maxHeight: "513px",
  border: `1px solid ${theme.palette.border.lowemp}`,
  backgroundColor: theme.palette.background.elevation1,
  ".selected-amount": {
    color: theme.palette.purple[400],
  },
  ".total-amount,.rate-amount": {
    color: theme.palette.textColor.highemp,
  },
  "&::-webkit-scrollbar": {
    width: "6px",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: `${theme.palette.background.elevation1}`,
    borderRadius: "3px",
  },
  "&::-webkit-scrollbar-track": {
    backgroundColor: "transparent",
  },
});

const StyledBox = styled(Box)({
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
});

const StyledButton = styled(Button)({
  padding: "20px 40px",
  borderRadius: "12px",
  maxHeight: "59px",
  width: "100%",
  whiteSpace: "nowrap",
  fontSize: "16px",
  [theme.breakpoints.down("sm")]: {
    fontSize: "14px",
  },
  "&.Mui-disabled": {
    color: theme.palette.white[500],
    backgroundColor: theme.palette.purple[500],
    opacity: "56%",
  },
});

const Summary = ({
  value,
  onHandleResetBtn,
  onHandleSlider,
  handleReview,
  handleSubmit,
  ...props
}: SummaryProps) => {
  const totalAmount = () => {
    if (props.sliderAmount)
      return replaceNumberWithCommas(
        (props.sliderAmount + Number(props.sliderAmount * 0.12)).toFixed(2)
      );
    return replaceNumberWithCommas((value + value * 0.12).toFixed(2));
  };

  return (
    <StyledCard>
      <IconLabel
        typographyVariant="heading2"
        typographyText={SUMMARY_HEADER_CONTENT}
        typographySx={{ color: theme.palette.textColor.highemp }}
        iconSrc={moreInfo}
        iconAltText={"more info icon"}
        iconFirst={false}
        sx={{ gap: "8px", alignSelf: "flex-start" }}
      />
      {SUMMARY_CARD_INFO.map((item, index) => {
        return (
          <StyledBox key={item}>
            <SeederTypography
              variant="body1"
              text={item}
              sx={{ color: theme.palette.textColor.lowemp }}
            />
            <SeederTypography
              variant="body1"
              text={
                index === 0
                  ? `${props.termDuration} months`
                  : props.selectedContracts
              }
              sx={{ color: theme.palette.textColor.highemp }}
            />
          </StyledBox>
        );
      })}
      {props.slider && (
        <Box>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <SeederTypography
              variant="body1"
              sx={{ color: theme.palette.textColor.lowemp }}
              text={SUMMARY_SLIDER_HEADER}
            />
            <Button
              variant="outlined"
              backgroundColor={theme.palette.background.elevation2}
              sx={{
                color: theme.palette.textColor.medemp,
                borderRadius: "12px",
                padding: "6px 12px",
                border: "0px",
                "&.Mui-disabled": {
                  color: theme.palette.border.highemp,
                  opacity: "56%",
                },
              }}
              disabled={value === 0}
              onClick={onHandleResetBtn}
            >
              <SeederTypography
                variant="button1"
                text={SUMMARY_SLIDER_RESET_BUTTON}
              />
            </Button>
          </Box>
          <CustomSlider
            max={props.maxSliderAmount}
            sx={{
              width: "98%",
              marginLeft: "2.5%",
            }}
            value={value}
            onChange={onHandleSlider}
            step={0.01}
          />
          <Box>
            <SeederTypography
              variant="body1"
              sx={{ color: theme.palette.textColor.lowemp }}
              text={
                <>
                  <span className="selected-amount">
                    ${replaceNumberWithCommas(value.toString())}
                  </span>
                  <span>{SUMMARY_SLIDER_SELECTED_OF}</span>
                  <span className="total-amount">
                    ${replaceNumberWithCommas(props.maxSliderAmount)}
                  </span>
                </>
              }
            />
          </Box>
        </Box>
      )}
      <StyledBox>
        <SeederTypography
          variant="body1"
          text={SUMMARY_PAY_BACK_AMOUNT}
          sx={{ color: theme.palette.textColor.lowemp }}
        />
        <SeederTypography
          variant="body1"
          text={`$${replaceNumberWithCommas(
            props.sliderAmount
              ? props.sliderAmount.toFixed(2)
              : value.toString()
          )}`}
          sx={{ color: theme.palette.textColor.highemp }}
        />
      </StyledBox>
      <StyledBox>
        <SeederTypography
          variant="body1"
          text={SUMMARY_RATE_PERCENT}
          sx={{ color: theme.palette.textColor.lowemp }}
        />
        <SeederTypography
          variant="body1"
          text={
            <>
              <span className="rate-amount">{SUMMARY_RATE_VALUE}</span>
              <span>
                $
                {replaceNumberWithCommas(
                  props.sliderAmount
                    ? (props.sliderAmount * 0.12).toFixed(2)
                    : (value * 0.12).toFixed(2)
                )}
              </span>
            </>
          }
          sx={{ color: theme.palette.textColor.highemp }}
        />
      </StyledBox>
      <SeederDivider
        type={"login"}
        sx={{
          width: "100%",
          border: `1px solid ${theme.palette.border.highemp}`,
          height: "2px",
        }}
      />
      <StyledBox>
        <SeederTypography
          variant="heading3"
          text={SUMMARY_TOTAL_PAYOUT}
          sx={{ color: theme.palette.textColor.lowemp }}
        />
        <SeederTypography
          variant="heading2"
          text={`$${totalAmount()}`}
          sx={{ color: theme.palette.textColor.highemp }}
        />
      </StyledBox>
      <StyledButton
        variant="contained"
        backgroundColor={theme.palette.purple[500]}
        disabled={props.slider && value === 0}
        onClick={props.slider ? handleReview : handleSubmit}
      >
        <SeederTypography
          variant="button1"
          text={
            props.slider
              ? SUMMARY_REVIEW_CREDIT_BUTTON
              : SUMMARY_SUBMIT_CREDIT_BUTTON
          }
        />
      </StyledButton>
    </StyledCard>
  );
};

export default Summary;
