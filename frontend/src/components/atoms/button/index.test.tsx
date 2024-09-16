import { render, screen } from "@testing-library/react";
import Button from ".";
import React from "react";
import SeederTypography from "../typography";

describe("Button Component", () => {
  test("verify component render", () => {
    render(
      <Button>
        <SeederTypography variant="heading1" text="Review Credit" />
      </Button>
    );
    const buttonComponent = screen.getByTestId("button");
    expect(buttonComponent).toBeInTheDocument();
    expect(screen.getByText(/review credit/i)).toBeInTheDocument();
  });

  test("verify component render", () => {
    render(
      <Button disabled>
        <SeederTypography variant="heading1" text="Review Credit" />
      </Button>
    );
    const buttonComponent = screen.getByTestId("button");
    expect(buttonComponent).toBeDisabled();
    expect(screen.getByText(/review credit/i)).toBeInTheDocument();
  });
});
