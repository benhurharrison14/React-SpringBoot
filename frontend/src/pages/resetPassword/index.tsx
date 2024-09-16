import React, { useState } from "react";
import SigninSignupTemplate from "../../components/templates/signinSignupTemplate";
import { ForgotPassowrd } from "../../components/organisms/forgotPassword";
import { ChangePassowrd } from "../../components/organisms/changePassword";
import { ForgotPasswordStories } from "../../utils/constants";
import resetIcon from "../../../public/images/resetPassword.svg";
import templateImage from "../../../public/images/forgot-reset.png";
import { useNavigate } from "react-router-dom";

const ResetPasswordPage = () => {
  const [showForgotPassword, setShowForgotPassword] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();

  const handleReset = () => {
    setShowForgotPassword(false);
  };

  const navigateToLoginPage = () => {
    navigate("/");
  };

  return (
    <SigninSignupTemplate
      bodyNode={
        showForgotPassword ? (
          <ForgotPassowrd
            successful={false}
            heading={ForgotPasswordStories.ResetPasswordBoxHeading}
            bodyMessage={ForgotPasswordStories.ResetPasswordBoxBodyMessage}
            placeholderText={ForgotPasswordStories.ResetSuccessfulPlaceholder}
            iconSrc={resetIcon}
            handleReset={handleReset}
            onInputChange={(value: string) => setInputValue(value)}
            resetEmail={inputValue}
            handleLogin={navigateToLoginPage}
          />
        ) : (
          <ChangePassowrd />
        )
      }
      imageSrc={templateImage}
    />
  );
};

export default ResetPasswordPage;
