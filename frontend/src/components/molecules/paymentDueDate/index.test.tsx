import { render, screen } from "@testing-library/react";
import PaymentDueDate from ".";
import React from "react";
import { DUE_AMOUNT_CONTENT, DUE_AMOUNT_FOOTER_TEXT, PAYMENT_DUE_DATE } from "../../../utils/constants";
import receipt from "../../../../public/images/receipt.svg"
import circularProgress from "../../../../public/images/circularProgress.svg"

describe("Payment DueDate component", () => {
  test("verify component render", () => {
    render(
      <PaymentDueDate
        dueDateState={true}
        iconSrc={receipt}
        iconAltText={"receipt icon"}
        typographyText={DUE_AMOUNT_CONTENT}
        footerText={DUE_AMOUNT_FOOTER_TEXT}
      />
    );
    expect(screen.getAllByRole("img")).toHaveLength(2);
    expect(screen.getByAltText("receipt icon")).toBeInTheDocument()
    expect(screen.getByText(PAYMENT_DUE_DATE)).toBeInTheDocument()
  });

  test("verify outstanding amount component render",()=>{
    render(
        <PaymentDueDate
          dueDateState={false}
          iconSrc={circularProgress}
          iconAltText={"loader icon"}
          typographyText={DUE_AMOUNT_CONTENT}
          footerText={DUE_AMOUNT_FOOTER_TEXT}

        />
      );
      expect(screen.getAllByRole("img")).toHaveLength(2);
      expect(screen.getByAltText("loader icon")).toBeInTheDocument()
      expect(screen.queryByText(PAYMENT_DUE_DATE)).not.toBeInTheDocument()
  })
});
