import * as React from "react";
import { render, screen } from "@testing-library/react";
import InputField from "./index";
import { ThemeProvider } from "@emotion/react";
import theme from "../../../utils/themes";

describe("Testing the InputField", () => {
  test("InputField search bar", () => {
    render(
      <ThemeProvider theme={theme}>
        <InputField placeholder="Search cards" value="Airline" />
      </ThemeProvider>
    );
    const Test = screen.getByTestId("input-field");
    expect(Test).toBeInTheDocument();
  });

  test("InputField search bar with optional props", () => {
  render(
    <ThemeProvider theme={theme}>
      <InputField placeholder="Search cards" value="Airline" createCashKick={true} />
    </ThemeProvider>
  );
  const Test = screen.getByTestId("input-field");
  expect(Test).toBeInTheDocument();
});

});
