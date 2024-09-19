import React, { useEffect } from "react";
import "./index.css";
import { ThemeProvider } from "@emotion/react";
import theme from "./utils/themes";
import { Route, Routes } from "react-router-dom";
import SignUpPage from "./pages/signUp";
import { ForgotPasswordPage } from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/resetPassword";
import HomePage from "./pages/homePage";
import SignInPage from "./pages/signIn";
import CashAccelerationPage from "./pages/cashAccelerationPage";
import NewCashkickPage from "./pages/newCashKickPage";
import { useAppContext } from "./context";
import { useAuth0 } from "@auth0/auth0-react";
import { getUser, getUserDetail, postUser } from "./services";
import { SLIDER_MAX_AMOUNT } from "./utils/constants";

const App = () => {
  const { userId, setUserId, setUserName, setCreditBalance, creditBalance } =
    useAppContext();
  const { isAuthenticated, user } = useAuth0();
  useEffect(() => {
    if (isAuthenticated) {
      onAuthLogin();
    }
  }, [isAuthenticated]);

  const onAuthLogin = async () => {
    const createNewUser = {
      name: user?.name,
      email: user?.email,
      password: "authLogin",
      creditBalance: SLIDER_MAX_AMOUNT,
    };
    const getUserData = await getUser(user?.email);

    if (!getUserData) {
      await postUser(createNewUser);
    }
    await getUserDetail({ email: user?.email, password: "authLogin" }).then(
      (res) => {
        setUserId(res.userId);
        setCreditBalance(res.creditBalance);
        setUserName(res.name);
        sessionStorage.setItem("token", res.token);
      }
    );
  };

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="/" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="reset-password" element={<ResetPasswordPage />} />
          <Route
            path="/cash-acceleration"
            element={
              isAuthenticated || userId !== 0 ? (
                <CashAccelerationPage />
              ) : (
                <SignInPage />
              )
            }
          />
          <Route
            path="new-cashkick"
            element={
              isAuthenticated || userId !== 0 ? (
                <NewCashkickPage />
              ) : (
                <SignInPage />
              )
            }
          />
          <Route
            path="/home"
            element={
              isAuthenticated || userId !== 0 ? (
                <HomePage isExistingUser={creditBalance < 880000} />
              ) : (
                <SignInPage />
              )
            }
          />
        </Routes>
      </ThemeProvider>
    </div>
  );
};

export default App;
