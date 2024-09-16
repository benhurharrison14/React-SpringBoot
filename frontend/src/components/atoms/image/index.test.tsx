import React from "react";
import Image from ".";
import { render, screen } from "@testing-library/react";

test("should render an image correctly", () => {
  render(<Image src="" alt="Image" height={"100%"} width={"100%"} />);
  const altMessage = screen.getByAltText("Image");
  expect(altMessage).toBeDefined();
});
