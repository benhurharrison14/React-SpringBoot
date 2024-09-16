import { fireEvent, render, screen } from "@testing-library/react";
import { SideNavBar } from ".";
import React from "react";
import { BrowserRouter } from "react-router-dom";

test("should render SideNavBar correctly", () => {
  render(
    <BrowserRouter>
      <SideNavBar homeButton />
    </BrowserRouter>
  );
  const homeText = screen.getByText("Home");
  fireEvent.click(homeText);
  const cashAcceleration = screen.getByText("Cash Acceleration");
  fireEvent.click(cashAcceleration);
});
