import React, { useState } from "react";
import { Box, InputAdornment, Stack, styled } from "@mui/material";
import theme from "../../../utils/themes";
import SeederTypography from "../../atoms/typography";
import InputField from "../../atoms/inputfield";
import SeederIcons from "../../atoms/icon";
import Button from "../../atoms/button";
import ResetEmailSent from "../../molecules/resetEmailSent";
import {
  EMAIL_REGEX_PATTERN,
  ForgotPassowrdConstants,
  RESET_CODE_REGEX_PATTERN,
} from "../../../utils/constants";

interface ForgotPasswordProps {
  successful: boolean;
  bodyMessage?: string;
  heading: string;
  placeholderText: string;
  resetEmail?: string;
  iconSrc: string;
  handleLogin?: React.MouseEventHandler<HTMLSpanElement>;
  handleReset?: React.MouseEventHandler<HTMLButtonElement>;
  handleContinue?: React.MouseEventHandler<HTMLButtonElement>;
  onInputChange?: (value: string) => void;
}

const FooterContainer = styled("div")({
  display: "inline-flex",
  alignItems: "flex-start",
  justifyContent: "flex-start",
  marginTop: "40px",
  width: "100%",
});

const StyledButton = styled(Button)({
  width: "31vw",
  height: "59px",
  backgroundColor: theme.palette.purple[500],
  color: theme.palette.white[500],
  borderRadius: "12px",
  marginTop: "24px",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: theme.palette.purple[500],
  },
});

export const ForgotPassowrd = ({
  successful,
  bodyMessage,
  heading,
  placeholderText,
  resetEmail,
  iconSrc,
  handleLogin,
  handleReset,
  onInputChange,
  handleContinue
}: ForgotPasswordProps) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);

  const validateInput = (newValue: string) => {
    if (placeholderText.toLowerCase().includes("email")) {
      setIsButtonDisabled(!EMAIL_REGEX_PATTERN.test(newValue));
    } else if (placeholderText.toLowerCase().includes("reset")) {
      setIsButtonDisabled(!RESET_CODE_REGEX_PATTERN.test(newValue));
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setInputValue(newValue);
    if (onInputChange) {
      onInputChange(newValue);
    }
    validateInput(newValue);
  };

  return (
    <Box>
      <Stack direction={"column"} spacing={2}>
        <SeederTypography
          text={heading}
          variant="title"
          color={theme.palette.textColor.highemp}
        />
        <SeederTypography
          text={bodyMessage}
          variant="heading3"
          color={theme.palette.textColor.lowemp}
          sx={{ width: "100%", maxWidth: "32vw" }}
        />
      </Stack>
      {!successful && (
        <Stack direction={"column"} marginTop={"32px"}>
          <InputField
            placeholder={placeholderText}
            value={inputValue}
            onChange={handleInputChange}
            sx={{ width: "31vw", color: theme.palette.textColor.medemp }}
            type={"text"}
            inputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SeederIcons src={iconSrc} alt={"startIcon"} />
                </InputAdornment>
              ),
            }}
          />
        </Stack>
      )}
      {successful && (
        <>
          <Stack
            direction={"column"}
            spacing={4}
            marginTop={"32px"}
            width={"32vw"}
          >
            <ResetEmailSent resetEmail={true} email={resetEmail} />
          </Stack>
          <StyledButton onClick={handleContinue}>
            <SeederTypography
              text={ForgotPassowrdConstants.trueButton}
              variant="button1"
              color={theme.palette.white[500]}
            />
          </StyledButton>
        </>
      )}
      {!successful && (
        <>
          <StyledButton
            disabled={isButtonDisabled}
            onClick={handleReset}
            sx={{
              "&.Mui-disabled": {
                color: theme.palette.white[500],
                backgroundColor: theme.palette.purple[500],
                opacity: "56%",
              },
            }}
          >
            <SeederTypography
              text={ForgotPassowrdConstants.falseButton}
              variant="button1"
              color={theme.palette.white[500]}
            />
          </StyledButton>
          <FooterContainer>
            <SeederTypography
              variant="heading3"
              sx={{ color: theme.palette.textColor.lowemp }}
              text={"Go back to"}
            />
            <Button variant="text" backgroundColor="transparent">
              <SeederTypography
                text={"Login"}
                variant="button1"
                color={theme.palette.purple[400]}
                onClick={handleLogin}
              />
            </Button>
          </FooterContainer>
        </>
      )}
    </Box>
  );
};
