import React from "react";
import { render } from "@testing-library/react";
import HomeTemplate from ".";
import SeederTypography from "../../atoms/typography";
import { BrowserRouter } from "react-router-dom";

describe("Seeder HomeTemplate", () => {
  it("render the Seeder HomeTemplate without errors", () => {
    const element = render(
      <BrowserRouter>
        <HomeTemplate
          headerContent={<SeederTypography variant="body1" text="Header" />}
          bodyContent={<SeederTypography variant="body1" text="Header" />}
          currentPage
        />
      </BrowserRouter>
    );
    expect(element).toBeDefined();
  });
});
