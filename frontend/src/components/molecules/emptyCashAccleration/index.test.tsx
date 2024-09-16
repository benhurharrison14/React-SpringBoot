import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import EmptyCashAccleration from ".";
import { CONNECTION_SUCCESS } from "../../../utils/constants";
import theme from "../../../utils/themes";
import SeederTypography from "../../atoms/typography";
import ConnectSuccessFul from "../../../../public/images/connectSuccessful.svg";

describe("Seeder EmptyCashAccleration", () => {
  const handleButtonClick = jest.fn();
  it("render the Seeder EmptyCashAccleration without errors", () => {
    const element = render(
      <EmptyCashAccleration
        src={ConnectSuccessFul}
        alt={CONNECTION_SUCCESS}
        button={false}
        handleButtonClick={handleButtonClick}
      >
        <SeederTypography
          variant="heading3"
          text={CONNECTION_SUCCESS}
          sx={{ color: theme.palette.textColor.highemp }}
        />
      </EmptyCashAccleration>
    );
    expect(element).toBeDefined();

    fireEvent.click(screen.getByAltText(CONNECTION_SUCCESS));
  });

  it("render the Seeder EmptyCashAccleration with other props", () => {
    const element = render(
      <EmptyCashAccleration
        src={ConnectSuccessFul}
        alt={CONNECTION_SUCCESS}
        button={true}
        text="retry"
      >
        <SeederTypography
          variant="heading3"
          text={CONNECTION_SUCCESS}
          sx={{ color: theme.palette.textColor.highemp }}
        />
      </EmptyCashAccleration>
    );
    expect(element).toBeDefined();
  });
});
