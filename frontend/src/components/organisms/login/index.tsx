import { InputAdornment, styled } from "@mui/material";
import React, { useState } from "react";
import SeederTypography from "../../atoms/typography";
import {
  ALREADY_AN_ACCOUNT,
  CONTINUE_ALT,
  DIRECT_NOTIFICATION_ALT,
  EMAIL_ERROR,
  EMPTY_FIELD,
  ENTER_EMAIL_HEAD_TEXT,
  FORGOT_PASSWORD,
  GOOGLE_ALT,
  LOCK_ICON_ALT,
  LOGIN_HEADER_TEXT,
  LOGIN_PASSWORD_PLACEHOLDER,
  LOGIN_PLACEHOLDER,
  NAME_PLACEHOLDER,
  NO_ACCOUNT,
  PASS_ERROR,
  SIGNIN_ALT,
  SIGNUP_ALT,
  SIGNUP_EMAIL_PLACEHOLDER,
  SIGNUP_HEADER_TEXT,
  SIGNUP_PASSWORD_PLACEHOLDER,
  SLIDER_MAX_AMOUNT,
  SMILE_ICON_ALT,
  STRIPE_ALT,
  VALIDEMAIL,
  VALIDPASSWORD,
  VISIBILITY_ALT,
  XERO_ALT,
} from "../../../utils/constants";
import theme from "../../../utils/themes";
import InputField from "../../atoms/inputfield";
import SeederIcons from "../../atoms/icon";
import DirectNotification from "../../../../public/images/direct-notification.svg";
import Lock from "../../../../public/images/lock.svg";
import LockIcon from "../../../../public/images/lock-icon.svg";
import visible from "../../../../public/images/eye.svg";
import invisible from "../../../../public/images/eye-slash.svg";
import Button from "../../atoms/button";
import SeederDivider from "../../atoms/divider";
import google from "../../../../public/images/google.svg";
import stripe from "../../../../public/images/stripe.svg";
import xero from "../../../../public/images/xero.svg";
import smile from "../../../../public/images/smile.svg";
import { getUserDetail, postUser } from "../../../services";
import { useAppContext } from "../../../context";
import { useNavigate } from "react-router-dom";

const MainContainer = styled("div")({
  display: "flex",
  maxWidth: "434px",
  width: "100%",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
});

const HeaderContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  maxWidth: "434px",
  alignItems: "flex-start",
  alignSelf: "flex-start",
  gap: "4px",
});

const TextFieldContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  alignItems: "flex-start",
  marginTop: "40px",
  maxWidth: "434px",
  width: "100%",
});

const typographySx: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "4px 8px",
  gap: "10px",
  color: `${theme.palette.textColor.medemp}`,
};

const buttonSx: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  width: "129.67px",
  height: "96px",
  padding: "20px 40px",
  borderRadius: "12px",
  border: "0px",
  gap: "8px",
  justifyContent: "center",
  color: theme.palette.white[500],
};

const buttonTextSx: React.CSSProperties = {
  color: theme.palette.purple[400],
  padding: "4px 12px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "4px",
};

const IconContainer = styled("div")({
  display: "flex",
  alignItems: "flex-start",
  gap: "20px",
  marginTop: "32px",
  width: "100%",
  flexWrap: "wrap",
});

const FooterContainer = styled("div")({
  display: "inline-flex",
  alignItems: "flex-start",
  marginTop: "44px",
  width: "100%",
});

const ContinueButtonSx = {
  display: "flex",
  padding: "20px 40px",
  justifyContent: "center",
  alignItems: "center",
  gap: "8px",
  width: "434px",
  borderRadius: "12px",
  marginTop: "24px",
  "&.Mui-disabled": {
    color: theme.palette.white[500],
    backgroundColor: theme.palette.purple[500],
    opacity: "56%",
  },
};

export interface ILoginProp {
  handleForgotPassword?: React.MouseEventHandler<HTMLButtonElement>;
  handleSignUp?: React.MouseEventHandler<HTMLButtonElement>;
  handleGoogleLogin?: React.MouseEventHandler<HTMLButtonElement>;
  handleContinueSignUp?: React.MouseEventHandler<HTMLButtonElement>;
  handleSignIn?: React.MouseEventHandler<HTMLButtonElement>;
  signup?: boolean;
}

const Login = ({
  handleForgotPassword,
  handleSignUp,
  handleGoogleLogin,
  signup,
  handleSignIn,
  handleContinueSignUp,
}: ILoginProp) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [visiblePassword, setVisiblePassword] = useState<boolean>(false);

  const [state, setState] = useState({
    name: "",
    username: "",
    password: "",
    passwordError: "",
    emailError: "",
    nameError: "",
  });

  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;

    if (name === "password") {
      handlePasswordChange(value);
    }

    if (name === "username") {
      handleUsernameChange(value);
    }

    if (name === "name") {
      handleNameChange(value);
    }
  };

  const handlePasswordChange = (value: string) => {
    handleUsernameChange(state.username);
    if (state.username !== "" && (signup ? state.name !== "" : true)) {
      let passError = "";
      if (VALIDPASSWORD.test(value)) {
        passError = PASS_ERROR;
      }
      setState((prevState) => ({
        ...prevState,
        passwordError: signup ? passError : "",
        password: value,
      }));
    }
  };

  const handleUsernameChange = (value: string) => {
    let emailError = "";
    signup && handleNameChange(state.name);
    if (signup && state.name === "") {
      if (value.length === 0) {
        emailError = EMPTY_FIELD;
      }
      setState((prevState) => ({
        ...prevState,
        emailError: emailError,
      }));
    } else {
      if (value.length === 0) {
        emailError = EMPTY_FIELD;
      } else if (!VALIDEMAIL.test(value)) {
        emailError = EMAIL_ERROR;
      }
      setState((prevState) => ({
        ...prevState,
        emailError: signup ? emailError : "",
        username: value,
      }));
    }
  };

  const handleNameChange = (value: string) => {
    setState((prevState) => ({
      ...prevState,
      nameError: value.length === 0 ? EMPTY_FIELD : "",
      name: value,
    }));
  };

  const handlePasswordVisibility = () => {
    setVisiblePassword(!visiblePassword);
  };

  const isFormValid = () => {
    return (
      state.emailError === "" &&
      state.passwordError === "" &&
      state.username !== "" &&
      state.password !== "" &&
      state.nameError === ""
    );
  };

  const createNewUser = () => ({
    name: state.name,
    email: state.username,
    password: state.password,
    creditBalance: SLIDER_MAX_AMOUNT,
  });

  const onHandleContinueSignUp = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    await postUser(createNewUser());
    handleContinueSignUp?.(event);
  };

  const LoginUser = () => ({
    email: state.username,
    password: state.password,
  });

  const { setUserId, setCreditBalance, setUserName } = useAppContext();

  const onHandleContinueSignIn = async () => {
    await getUserDetail(LoginUser()).then((res) => {
      setUserId(res.userId);
      setCreditBalance(res.creditBalance);
      setUserName(res.name);
      sessionStorage.setItem("token", res.token);
      navigate("/home");
    });
  };

  return (
    <MainContainer>
      <HeaderContainer>
        <SeederTypography
          variant="title"
          text={signup ? SIGNUP_HEADER_TEXT : LOGIN_HEADER_TEXT}
          sx={{ color: theme.palette.textColor.highemp }}
        />
        {!signup && (
          <SeederTypography
            variant="heading3"
            text={ENTER_EMAIL_HEAD_TEXT}
            sx={{ color: theme.palette.textColor.lowemp }}
          />
        )}
      </HeaderContainer>
      <TextFieldContainer>
        {signup && (
          <InputField
            sx={{ maxWidth: "434px", color: theme.palette.textColor.medemp }}
            type="text"
            placeholder={NAME_PLACEHOLDER}
            value={state.name}
            name="name"
            onChange={handleChange}
            helperText={state.nameError}
            error={state.nameError !== ""}
            inputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SeederIcons src={smile} alt={SMILE_ICON_ALT} />
                </InputAdornment>
              ),
            }}
          />
        )}

        <InputField
          sx={{ maxWidth: "434px", color: theme.palette.textColor.medemp }}
          type="text"
          placeholder={signup ? SIGNUP_EMAIL_PLACEHOLDER : LOGIN_PLACEHOLDER}
          value={state.username}
          name="username"
          onChange={handleChange}
          helperText={state.emailError}
          error={state.emailError !== ""}
          inputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SeederIcons
                  src={DirectNotification}
                  alt={DIRECT_NOTIFICATION_ALT}
                />
              </InputAdornment>
            ),
          }}
        />

        <InputField
          sx={{ maxWidth: "434px", color: theme.palette.textColor.medemp }}
          value={state.password}
          name="password"
          onChange={handleChange}
          type={visiblePassword ? "text" : "password"}
          placeholder={
            signup ? SIGNUP_PASSWORD_PLACEHOLDER : LOGIN_PASSWORD_PLACEHOLDER
          }
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          helperText={state.passwordError}
          error={state.passwordError !== ""}
          inputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SeederIcons
                  src={isFocused ? LockIcon : Lock}
                  alt={LOCK_ICON_ALT}
                />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="start">
                <SeederIcons
                  src={visiblePassword ? visible : invisible}
                  alt={VISIBILITY_ALT}
                  onClick={handlePasswordVisibility}
                />
              </InputAdornment>
            ),
          }}
        />
        <Button
          variant="text"
          backgroundColor="transparent"
          sx={buttonTextSx}
          onClick={handleForgotPassword}
        >
          <SeederTypography
            text={signup ? "" : FORGOT_PASSWORD}
            variant="button1"
          />
        </Button>
      </TextFieldContainer>
      <Button
        backgroundColor={theme.palette.purple[500]}
        onClick={signup ? onHandleContinueSignUp : onHandleContinueSignIn}
        disabled={!isFormValid()}
        sx={ContinueButtonSx}
      >
        <SeederTypography
          variant="button1"
          text={signup ? SIGNUP_ALT : CONTINUE_ALT}
          sx={{ color: theme.palette.white[500] }}
        />
      </Button>
      <SeederDivider
        type="login"
        sx={{
          maxWidth: "434px",
          width: "100%",
          color: theme.palette.textColor.highemp,
          marginTop: "33px",
          "&.MuiDivider-root": {
            "&::before": {
              borderTop: `thin solid ${theme.palette.border.highemp}`,
            },

            "&::after": {
              borderTop: `thin solid ${theme.palette.border.highemp}`,
            },
          },
        }}
      >
        <SeederTypography variant="body2" text="Or" sx={typographySx} />
      </SeederDivider>
      <IconContainer>
        <Button
          variant="outlined"
          startIcon={<SeederIcons src={google} alt={GOOGLE_ALT} />}
          backgroundColor={theme.palette.background.elevation1}
          onClick={handleGoogleLogin}
          sx={{
            ...buttonSx,
            "& .MuiButton-startIcon": {
              margin: 0,
            },
          }}
        >
          <SeederTypography text={GOOGLE_ALT} variant="button1" />
        </Button>
        <Button
          variant="outlined"
          startIcon={<SeederIcons src={stripe} alt={STRIPE_ALT} />}
          backgroundColor={theme.palette.background.elevation1}
          sx={{
            ...buttonSx,
            "& .MuiButton-startIcon": {
              margin: 0,
            },
          }}
        >
          <SeederTypography text={STRIPE_ALT} variant="button1" />
        </Button>

        <Button
          variant="outlined"
          startIcon={<SeederIcons src={xero} alt={XERO_ALT} />}
          backgroundColor={theme.palette.background.elevation1}
          sx={{
            ...buttonSx,
            "& .MuiButton-startIcon": {
              margin: 0,
            },
          }}
        >
          <SeederTypography text={XERO_ALT} variant="button1" />
        </Button>
      </IconContainer>
      <FooterContainer>
        <SeederTypography
          variant="heading3"
          sx={{ color: theme.palette.textColor.lowemp }}
          text={signup ? ALREADY_AN_ACCOUNT : NO_ACCOUNT}
        />
        <Button
          variant="text"
          backgroundColor="transparent"
          sx={buttonTextSx}
          onClick={signup ? handleSignIn : handleSignUp}
        >
          <SeederTypography
            text={signup ? SIGNIN_ALT : SIGNUP_ALT}
            variant="button1"
          />
        </Button>
      </FooterContainer>
    </MainContainer>
  );
};

export default Login;
