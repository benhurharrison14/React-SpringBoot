import { styled } from "@mui/material";
import React from "react";
import SigninSignupTemplate from "../../components/templates/signinSignupTemplate";
import Login from "../../components/organisms/login";
import SignUpImage from "../../../public/images/signup.png";
import { useNavigate } from "react-router-dom";

const MainContainer = styled("div")({
  display: "flex",
});

const SignUpPage = () => {
  const navigate = useNavigate();

  const navigateToLogin = () => {
    navigate("/");
  };

  return (
    <MainContainer>
      <SigninSignupTemplate
        imageSrc={SignUpImage}
        bodyNode={
          <Login
            signup={true}
            handleContinueSignUp={navigateToLogin}
            handleSignIn={navigateToLogin}
          />
        }
      />
    </MainContainer>
  );
};

export default SignUpPage;
