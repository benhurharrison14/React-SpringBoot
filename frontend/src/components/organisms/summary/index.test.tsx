import { fireEvent, render, screen } from "@testing-library/react";
import Summary from ".";
import React from "react";
import { SLIDER_MAX_AMOUNT } from "../../../utils/constants";

describe("Summary Card Component", () => {
  const handleReset = jest.fn();
  const handleChange = jest.fn();
  test("verify component render", () => {
    render(
      <Summary
        selectedContracts={2}
        slider={true}
        termDuration={12}
        maxSliderAmount={SLIDER_MAX_AMOUNT}
        sliderAmount={224654.78}
        onHandleResetBtn={handleReset}
        onHandleSlider={handleChange}
        value={SLIDER_MAX_AMOUNT}
      />
    );
    expect(screen.getByText(/summary/i)).toBeInTheDocument();
    const slider = screen.getByRole("slider");
    fireEvent.change(slider, { target: { value: SLIDER_MAX_AMOUNT } });
    expect(slider).toHaveValue(SLIDER_MAX_AMOUNT.toString());
    const resetButton = screen.getByRole("button", { name: /reset/i });
    fireEvent.click(resetButton);
    expect(handleReset).toBeCalled;
  });

  test("verify component renders without slider", () => {
    render(
      <Summary
        selectedContracts={2}
        slider={false}
        termDuration={12}
        maxSliderAmount={SLIDER_MAX_AMOUNT}
        onHandleResetBtn={jest.fn()}
        onHandleSlider={jest.fn}
        value={SLIDER_MAX_AMOUNT}
      />
    );
    expect(screen.queryByRole("slider")).not.toBeInTheDocument();
  });
});
