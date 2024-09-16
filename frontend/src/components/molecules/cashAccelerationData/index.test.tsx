import { render, screen } from "@testing-library/react";
import { CashAccelerationData } from ".";
import React from "react";

test("should render CashAccelerationData correctly", () => {
  render(
    <CashAccelerationData
      termCap={"12 Months"}
      availableCredit={"$704.45k"}
      maxInterestRate={"12.00%"}
    />
  );
  const termCap = screen.getByText("12 Months");
  expect(termCap).toBeInTheDocument;
});
