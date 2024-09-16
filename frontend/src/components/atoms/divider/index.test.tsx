import React from "react";
import { render } from "@testing-library/react";
import SeederDivider from ".";

describe("Seeder Divider", () => {
  it("render the Seeder Divider without errors", () => {
    const element = render(<SeederDivider type="login"/>);
    expect(element).toBeDefined();
  });

  it("render the Seeder Divider with other props", () => {
  const element = render(<SeederDivider type="summary" />);
  expect(element).toBeDefined();
});

});
