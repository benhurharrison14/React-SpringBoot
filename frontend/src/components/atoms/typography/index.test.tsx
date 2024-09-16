import React from "react";
import { render } from "@testing-library/react";
import SeederTypography from ".";

describe("Seeder Typography", () => {
  it("render the Seeder Typography without errors", () => {
    const element = render(
      <SeederTypography variant="body1" text="Seeder" />
    );
    expect(element).toBeDefined();
  });
});
