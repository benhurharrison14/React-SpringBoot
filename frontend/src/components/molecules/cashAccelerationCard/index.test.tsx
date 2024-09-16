import { render, screen } from "@testing-library/react";
import { CashAccelerationCard } from ".";
import React from "react";

test("should render cashAccelerationCard correctly", () => {
  render(
    <CashAccelerationCard
      iconSrc={""}
      cardHeading={"Term Cap"}
      cardData={"12 Months"}
    />
  );
  const cardHeading = screen.getByText("Term Cap");
  expect(cardHeading).toBeInTheDocument;
});
