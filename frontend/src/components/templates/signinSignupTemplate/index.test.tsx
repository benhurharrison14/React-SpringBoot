import React from "react";
import { render, screen } from "@testing-library/react";
import SigninSignupTemplate from ".";
import Login from "../../organisms/login";
import login from "../../../../public/images/login-panel.png";
import { BrowserRouter } from "react-router-dom";

describe("Signin Template", () => {
  test("verify render", () => {
    render(
      <BrowserRouter>
        <SigninSignupTemplate bodyNode={<Login signup />} imageSrc={login} />
      </BrowserRouter>
    );
    expect(screen.getByAltText("login-panel image")).toBeInTheDocument();
  });
});
