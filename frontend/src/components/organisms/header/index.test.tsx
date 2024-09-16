import { render, screen } from "@testing-library/react";
import Header from ".";
import React from "react";
import {
  NEW_CASHKICK_CONTENT,
  NEW_CASHKICK_FOOTER,
} from "../../../utils/constants";
import { BrowserRouter } from "react-router-dom";

describe("Header Component", () => {
  test("verify HomePage header renders correctly", () => {
    render(
      <BrowserRouter>
        <Header
          headerContent={NEW_CASHKICK_CONTENT}
          headerFooter={NEW_CASHKICK_FOOTER}
        />
      </BrowserRouter>
    );
    expect(screen.getAllByText(/cash kick/)).toHaveLength(2);
  });
});
