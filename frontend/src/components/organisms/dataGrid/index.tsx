import React from "react";
import { DataGrid, DataGridProps, GridRowId } from "@mui/x-data-grid";
import { styled } from "@mui/material";
import theme from "../../../utils/themes";
import Checkbox from "../../atoms/checkbox";

export interface ISeederDataGridProps extends DataGridProps {
  type?: boolean;
  handleSelection?: React.Dispatch<React.SetStateAction<GridRowId[]>>;
  selectedRows?: GridRowId[];
}

const MainContainer = styled("div")({
  display: "flex",
  maxWidth: "1500px",
  flexDirection: "column",
});

const DataGridSx = {
  background: theme.palette.background.elevation1,
  "& .MuiDataGrid-row.Mui-selected": {
    backgroundColor: theme.palette.purple[600],
  },
  "&.MuiDataGrid-root": {
    borderWidth: "0px",
  },
  ".MuiDataGrid-columnSeparator": {
    display: "none",
  },
  "& .MuiDataGrid-columnHeaders": {
    background: theme.palette.gray[100],
    borderRadius: "8px",
    borderBottom: "0px",
  },
  "& .MuiDataGrid-cell": {
    borderBottom: "0px",
  },
  overflow: "auto",
  "& .MuiDataGrid-virtualScroller::-webkit-scrollbar": {
    height: "8px",
  },
  "& .MuiDataGrid-virtualScroller::-webkit-scrollbar-track": {
    background: theme.palette.background.elevation2,
    height: "15px",
    borderRadius: "4px",
    padding: "4px 3px",
  },
  "& .MuiDataGrid-virtualScroller::-webkit-scrollbar-thumb": {
    backgroundColor: theme.palette.icon.lowemp,
    borderRadius: "20px",
    height: "8px",
  },
};

const SeederDataGrid = ({
  rows,
  columns,
  type,
  handleSelection,
  selectedRows,
}: ISeederDataGridProps) => {
  return (
    <MainContainer>
      <DataGrid
        rows={rows}
        columns={columns}
        {...(type ? { checkboxSelection: true } : {})}
        disableRowSelectionOnClick
        disableVirtualization
        hideFooter
        disableColumnMenu
        slots={{
          baseCheckbox: Checkbox,
        }}
        sx={DataGridSx}
        rowHeight={62}
        rowSelectionModel={selectedRows}
        onRowSelectionModelChange={(rowId: GridRowId[]) => {
          handleSelection?.(rowId);
        }}
      />
    </MainContainer>
  );
};

export default SeederDataGrid;
