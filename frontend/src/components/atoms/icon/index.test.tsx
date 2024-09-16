import React from "react";
import SeederIcons from ".";
import CalendarIcon from "../../../../public/images/calendar.svg";
import { render } from "@testing-library/react";

describe("Seeder Icon", () => {
  it("render the Seeder Icons without errors", () => {
    const element = render(<SeederIcons src={CalendarIcon} alt={"Calendar Icon Alt"} />);
    expect(element).toBeDefined();
  });
});
