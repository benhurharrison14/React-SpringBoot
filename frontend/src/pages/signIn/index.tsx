import { Box } from "@mui/material";
import React from "react";
import SigninSignupTemplate from "../../components/templates/signinSignupTemplate";
import Login from "../../components/organisms/login";
import login from "../../../public/images/login-panel.png";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const SignInPage = () => {
  const navigate = useNavigate();

  const navigateToSignup = () => {
    navigate("/signup");
  };

  const navigateToForgotPasswordPage = () => {
    navigate("/forgot-password");
  };

  const { loginWithRedirect } = useAuth0();

  const handleClick = () => {
    loginWithRedirect({
      authorizationParams: { connection: "google-oauth2" },
    });
  };

  return (
    <Box sx={{ display: "flex" }}>
      <SigninSignupTemplate
        bodyNode={
          <Login
            signup={false}
            handleSignUp={navigateToSignup}
            handleForgotPassword={navigateToForgotPasswordPage}
            handleGoogleLogin={handleClick}
          />
        }
        imageSrc={login}
      />
    </Box>
  );
};

export default SignInPage;
