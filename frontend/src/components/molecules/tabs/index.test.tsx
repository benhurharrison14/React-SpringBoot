import React from "react";
import { fireEvent, render } from "@testing-library/react";
import SeederTabs from ".";
import SeederTypography from "../../atoms/typography";

describe("Seeder Tabs", () => {
  it("render the Seeder Tabs without errors", () => {
    const element = render(<SeederTabs contractContent={<SeederTypography variant="body1" text="Contracts"/>} myCashKickContent={<SeederTypography variant="body1" text="Cash Kick"/>} />);
    expect(element).toBeDefined();

    const tabs = element.getAllByRole("tab");
    fireEvent.click(tabs[0]);
    fireEvent.click(tabs[1]);

  });
});
