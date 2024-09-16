import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import NameCashKick from ".";
import { NAME_CASH_KICK_PLACEHOLDER } from "../../../utils/constants";

describe("Seeder NameCashKick", () => {
  const handleCrossIcon = jest.fn();
  const handleCancelButton = jest.fn();
  const handleCreateCashKickButton = jest.fn();
  it("render the Seeder NameCashKick without errors", () => {
    const element = render(
      <NameCashKick
        handleCancelButton={handleCancelButton}
        handleCreateCashKickButton={handleCreateCashKickButton}
        handleCrossIcon={handleCrossIcon}
      />
    );
    expect(element).toBeDefined();

    const nameField = screen.getByPlaceholderText(NAME_CASH_KICK_PLACEHOLDER);
    fireEvent.change(nameField, { target: { value: "abc" } });
  });

  it("render the Seeder NameCashKick without errors", () => {
    const element = render(
      <NameCashKick
        handleCancelButton={handleCancelButton}
        handleCreateCashKickButton={handleCreateCashKickButton}
        handleCrossIcon={handleCrossIcon}
        setNameCashKick={jest.fn()}
      />
    );
    expect(element).toBeDefined();

    const nameField = screen.getByPlaceholderText(NAME_CASH_KICK_PLACEHOLDER);
    fireEvent.change(nameField, { target: { value: "abc" } });
  });
});
