import { Box, InputAdornment, Stack, styled } from "@mui/material";
import React, { useState } from "react";
import theme from "../../../utils/themes";
import SeederTypography from "../../atoms/typography";
import InputField from "../../atoms/inputfield";
import SeederIcons from "../../atoms/icon";
import Lock from "../../../../public/images/lock.svg";
import LockIcon from "../../../../public/images/lock-icon.svg";
import visible from "../../../../public/images/eye.svg";
import invisible from "../../../../public/images/eye-slash.svg";
import Button from "../../atoms/button";
import ResetEmailSent from "../../molecules/resetEmailSent";
import {
  ChangePasswordConstants,
  PASS_ERROR,
  passwordRegex,
} from "../../../utils/constants";
import { useLocation, useNavigate } from "react-router-dom";
import { resetPassword } from "../../../services";

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

export const ChangePassowrd = () => {
  const [password, setPassword] = useState<string>("");
  const [reEnterPassword, setReEnterPassword] = useState<string>("");
  const [isPasswordFocused, setIsPasswordFocused] = useState<boolean>(false);
  const [isReEnterPasswordFocused, setIsReEnterPasswordFocused] =
    useState<boolean>(false);
  const [visiblePassword, setVisiblePassword] = useState<boolean>(false);
  const [successful, setSuccessful] = useState<boolean>(false);
  const [isFirstFieldValid, setIsFirstFieldValid] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email;

  const isPasswordValid = (value: string) => {
    return passwordRegex.test(value);
  };

  const handlePasswordVisibility = () => {
    setVisiblePassword(!visiblePassword);
  };

  const validatePassword = () => {
    return !isPasswordValid(password);
  };

  const ReEnterpassword = () => {
    return reEnterPassword !== password;
  };

  const handleClick = async () => {
    if (!successful) {
      await resetPassword(email, password);
      setSuccessful(true);
    } else {
      navigate("/");
    }
  };

  const handleFirstFieldChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newValue = event.target.value;
    setPassword(newValue);
    setIsFirstFieldValid(isPasswordValid(newValue));
  };

  return (
    <Box>
      <SeederTypography
        text={
          successful
            ? ChangePasswordConstants.trueHeading
            : ChangePasswordConstants.falseHeading
        }
        variant="title"
        color={theme.palette.textColor.highemp}
      />
      {!successful && (
        <Stack direction={"column"} spacing={4} marginTop={"32px"}>
          <InputField
            placeholder={ChangePasswordConstants.firstPlaceholder}
            value={password}
            onChange={handleFirstFieldChange}
            sx={{ width: "31vw", color: theme.palette.textColor.medemp }}
            type={visiblePassword ? "text" : "password"}
            onFocus={() => setIsPasswordFocused(true)}
            onBlur={() => setIsPasswordFocused(false)}
            error={!isFirstFieldValid}
            helperText={isFirstFieldValid ? "" : PASS_ERROR}
            inputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SeederIcons
                    src={isPasswordFocused ? LockIcon : Lock}
                    alt={"startIcon"}
                  />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="start">
                  <SeederIcons
                    src={visiblePassword ? visible : invisible}
                    alt={"endIcon"}
                    onClick={handlePasswordVisibility}
                  />
                </InputAdornment>
              ),
            }}
          />
          <InputField
            placeholder={ChangePasswordConstants.secondPlaceholder}
            sx={{ width: "31vw" }}
            value={reEnterPassword}
            onChange={(event) => {
              setReEnterPassword(event.target.value);
            }}
            type="password"
            onFocus={() => setIsReEnterPasswordFocused(true)}
            onBlur={() => setIsReEnterPasswordFocused(false)}
            disabled={!isFirstFieldValid}
            inputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SeederIcons
                    src={isReEnterPasswordFocused ? LockIcon : Lock}
                    alt={""}
                  />
                </InputAdornment>
              ),
            }}
          />
        </Stack>
      )}
      {successful && (
        <Stack
          direction={"column"}
          spacing={4}
          marginTop={"32px"}
          width={"32vw"}
        >
          <ResetEmailSent resetEmail={false} />
        </Stack>
      )}
      <StyledButton
        disabled={ReEnterpassword() || validatePassword() || !isFirstFieldValid}
        sx={{
          "&.Mui-disabled": {
            color: theme.palette.white[500],
            backgroundColor: theme.palette.purple[500],
            opacity: "56%",
          },
        }}
        onClick={handleClick}
      >
        <SeederTypography
          text={
            successful
              ? ChangePasswordConstants.trueButton
              : ChangePasswordConstants.falseButton
          }
          variant="button1"
          color={theme.palette.white[500]}
        />
      </StyledButton>
    </Box>
  );
};
