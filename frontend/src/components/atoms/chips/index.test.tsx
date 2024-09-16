import React from "react";
import { render, screen } from "@testing-library/react";
import SeederChip from ".";
import SeederTypography from "../typography";

describe("Seeder Chips", () => {
  it("render the Seeder Chips without errors", () => {
    const element = render(
      <SeederChip
        label={<SeederTypography variant="body1" text="reset" />}
        variant={"filled"}
      />
    );
    expect(element).toBeDefined();

    expect(screen.getByText("reset")).toBeDefined;
  });
});
