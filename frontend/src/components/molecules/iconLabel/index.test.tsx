import { render, screen } from "@testing-library/react";
import IconLabel from ".";
import React from "react";
import theme from "../../../utils/themes";
import logout from "../../../../public/images/logoutIcon.svg";
import { iconLabelStyles } from "../../../utils/constants";

describe("IconLabel Component", () => {
  test("verify component renders correctly", () => {
    render(
      <IconLabel
        typographyText="Logout"
        typographyVariant="button2"
        typographySx={{
          color: theme.palette.accent.red,
        }}
        iconSrc={logout}
        iconAltText="logout icon"
        iconFirst={false}
        sx={iconLabelStyles}
      />
    );
    expect(screen.getByTestId("icon-label").firstChild?.textContent).toBe(
      "Logout"
    );
    expect(screen.getByText("Logout")).toBeInTheDocument();
    expect(screen.getByAltText("logout icon")).toBeInTheDocument();
  });

  test("verify icon renders first", async () => {
    render(
      <IconLabel
        typographyText="Logout"
        typographyVariant="button2"
        typographySx={{
          color: theme.palette.accent.red,
        }}
        iconSrc={logout}
        iconAltText="logout icon"
        iconFirst={true}
        sx={iconLabelStyles}
      />
    );
    const iconLabelComponent = screen.getByTestId("icon-label");
    expect(iconLabelComponent).toHaveStyle("flex-direction:row-reverse");
    expect(iconLabelComponent).toBeInTheDocument();
  });
});
