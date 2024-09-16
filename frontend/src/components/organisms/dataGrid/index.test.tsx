import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import SeederDataGrid from ".";
import { cashAcclerationRows, cashKickRows } from "../../../utils/constants";
import SeederChip from "../../atoms/chips";
import SeederTypography from "../../atoms/typography";
import theme from "../../../utils/themes";
import { TypographyOwnProps } from "@mui/material";
import { GridRenderCellParams } from "@mui/x-data-grid";

const customText = (
  text: string,
  variant: TypographyOwnProps["variant"],
  color?: string
) => {
  return (
    <SeederTypography
      variant={variant}
      text={text}
      sx={{
        color: color ?? theme.palette.textColor.lowemp,
        padding: "12px 20px",
      }}
    />
  );
};

const customDualText = (data: string[]) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        padding: "12px 20px",
        gap: "8px",
      }}
    >
      <SeederTypography
        variant="body2"
        text={data[0]}
        sx={{
          color: theme.palette.textColor.lowemp,
        }}
      />
      <SeederTypography
        variant="caption"
        text={data[1]}
        sx={{
          color: theme.palette.textColor.lowemp,
        }}
      />
    </div>
  );
};

const customChips = (data: string) => {
  return (
    <div style={{ padding: "12px 20px" }}>
      <SeederChip
        variant="filled"
        sx={{
          display: "flex",
          padding: "4px 8px",
          gap: "10px",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "4px",
          background: `${theme.palette.background.elevation2}`,
        }}
        label={
          <SeederTypography
            variant="body2"
            text={data}
            sx={{
              color: theme.palette.textColor.medemp,
            }}
          />
        }
      />
    </div>
  );
};

interface ICustomColumnProps {
  field: string;
  headerText: string;
  valueColor?: string;
}

const customColumn = ({
  field,
  headerText,
  valueColor,
}: ICustomColumnProps) => {
  return {
    field: field,
    width: 200,
    sortable: false,
    renderHeader: () => customText(headerText, `body2`),
    renderCell: (params: GridRenderCellParams) =>
      customText(params.value, `body2`, valueColor),
  };
};

const mockCashKickColumn = [
  customColumn({
    field: "name",
    headerText: "Name",
    valueColor: theme.palette.textColor.highemp,
  }),
  customColumn({
    field: "type",
    headerText: "Type",
    valueColor: theme.palette.textColor.lowemp,
  }),
  customColumn({
    field: "perPayment",
    headerText: "Per Payment",
    valueColor: theme.palette.textColor.lowemp,
  }),
  {
    field: "termLength",
    width: 200,
    sortable: false,
    renderHeader: () => customText("Term Length", `body2`),
    renderCell: (params: GridRenderCellParams) => customDualText(params.value),
  },
  customColumn({
    field: "paymentAmount",
    headerText: "Payment Amount",
    valueColor: theme.palette.textColor.lowemp,
  }),
];

describe("Seeder Data grid", () => {
  const handleSelection = jest.fn();
  it("render the Seeder Data grid without errors", () => {
    const element = render(
      <SeederDataGrid
        columns={mockCashKickColumn}
        rows={cashAcclerationRows}
        type={true}
        handleSelection={handleSelection}
      />
    );
    expect(element).toBeDefined();

    const unCheckedbox = screen.getAllByAltText("unchecked icon");
    fireEvent.click(unCheckedbox[0]);

    const checkbox = screen.getAllByRole("checkbox");
    fireEvent.click(checkbox[1]);
    expect(handleSelection).toHaveBeenCalledWith([1]);
  });

  it("render the Seeder Data grid without optional props", () => {
    const element = render(
      <SeederDataGrid
        columns={mockCashKickColumn}
        rows={cashAcclerationRows}
        type={true}
      />
    );
    expect(element).toBeDefined();

    const unCheckedbox = screen.getAllByAltText("unchecked icon");
    fireEvent.click(unCheckedbox[0]);

    const checkbox = screen.getAllByRole("checkbox");
    fireEvent.click(checkbox[1]);
  });

  it("render the Seeder Data grid with different props", () => {
    const element = render(
      <SeederDataGrid
        columns={[
          customColumn({ field: "name", headerText: "Name" }),
          {
            field: "status",
            width: 200,
            sortable: false,
            renderHeader: () => customText("Status", `body2`),
            renderCell: (params: GridRenderCellParams) =>
              customChips(params.value),
          },
          customColumn({ field: "maturity", headerText: "Maturity" }),

          {
            field: "totalReceived",
            width: 200,
            sortable: false,
            renderHeader: () => customText("Total Received", `body2`),
            renderCell: (params: GridRenderCellParams) =>
              customDualText(params.value),
          },
          customColumn({
            field: "totalFinanced",
            headerText: "Total Financed",
          }),
        ]}
        rows={cashKickRows}
      />
    );

    expect(element).toBeDefined();
  });
});
