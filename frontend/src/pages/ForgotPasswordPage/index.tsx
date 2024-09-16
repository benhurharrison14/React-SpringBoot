import React, { useState } from "react";
import SigninSignupTemplate from "../../components/templates/signinSignupTemplate";
import forgotImage from "../../../public/images/forgot-reset.png";
import { ForgotPassowrd } from "../../components/organisms/forgotPassword";
import { ForgotPasswordStories } from "../../utils/constants";
import emailIDIcon from "../../../public/images/forgotPassword.svg";
import { useNavigate } from "react-router-dom";
import { getUser } from "../../services";

export const ForgotPasswordPage = () => {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (value: string) => {
    setInputValue(value);
  };

  const navigateToLoginPage = () => {
    navigate("/");
  };

  const navigateToResetPasswordPage = () => {
    navigate("/reset-password", {
      state: {
        email: inputValue,
      },
    });
  };

  const handleResetClick = async () => {
    const response = await getUser(inputValue);
    if (response) {
      setOpen(true);
    }
  };

  return (
    <SigninSignupTemplate
      bodyNode={
        <>
          {open ? (
            <ForgotPassowrd
              successful={true}
              heading={ForgotPasswordStories.ForgotPasswordBoxHeding}
              bodyMessage={ForgotPasswordStories.ForgotPasswordBoxBodyMessage}
              placeholderText={""}
              iconSrc={""}
              resetEmail={inputValue}
              handleContinue={navigateToResetPasswordPage}
            />
          ) : (
            <ForgotPassowrd
              successful={false}
              heading={ForgotPasswordStories.ForgotPasswordBoxHeding}
              bodyMessage={ForgotPasswordStories.ForgotPasswordBoxBodyMessage}
              placeholderText={
                ForgotPasswordStories.ForgotPasswordBoxPlaceHolder
              }
              iconSrc={emailIDIcon}
              handleReset={handleResetClick}
              onInputChange={handleInputChange}
              handleLogin={navigateToLoginPage}
            />
          )}
        </>
      }
      imageSrc={forgotImage}
    />
  );
};
