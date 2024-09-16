import React from "react";
import LogoutScreen from ".";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { LOGOUT_DROPDOWN_USER_NAME } from "../../../utils/constants";
import { BrowserRouter } from "react-router-dom";
import { useAppContext } from "../../../context";

jest.mock("@auth0/auth0-react", () => ({
  useAuth0: () => ({
    logout: jest.fn(),
  }),
}));

jest.mock("../../../context", () => {
  return {
    ...jest.requireActual("../../../context"),
    useAppContext: jest.fn(),
  };
});

describe("LogoutScreen component", () => {

  beforeEach(()=>{
    (useAppContext as jest.Mock).mockImplementation(() => ({
      setUserId: jest.fn(),
    }));
  })

  test("verify component render", async () => {
       
    render(
        <BrowserRouter>
          <LogoutScreen
            userName={LOGOUT_DROPDOWN_USER_NAME}
            dropdownPosition={true}
          />
        </BrowserRouter>
    );
    const avatarComponent = screen.getByTestId("avatar");
    expect(avatarComponent).toBeInTheDocument();
    expect(screen.getByAltText("down arrow icon")).toBeInTheDocument();
    expect(screen.queryByText(/log out/i)).not.toBeInTheDocument();
    fireEvent.click(avatarComponent);
    const logoutButton = screen.getByText(/log out/i);
    expect(logoutButton).toBeInTheDocument();
    await fireEvent.click(logoutButton);
    await waitFor(() => {
      expect(screen.queryByText("Log Out")).not.toBeInTheDocument();
    });
  });
});
