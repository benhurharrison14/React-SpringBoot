import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import CustomSlider from "./index";

test("invokes onChange function when slider value changes", () => {
  const handleChange = jest.fn();
  render(<CustomSlider onChange={handleChange} max={100} />);
  const slider = screen.getByRole("slider");
  fireEvent.change(slider, { target: { value: "50" } });
  expect(handleChange).toHaveBeenCalledTimes(1);
  expect(handleChange).toHaveBeenCalledWith(expect.anything(), 50, 0);
});
