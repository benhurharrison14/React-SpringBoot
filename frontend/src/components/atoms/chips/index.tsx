import React from "react";
import Chip, { ChipProps } from "@mui/material/Chip";

interface IChipProps extends ChipProps {
  label: React.ReactNode;
  variant: "filled" | "outlined";
}

const SeederChip = ({ label, variant, icon, ...props }: IChipProps) => {
  const ChipSx = {
    ...props.sx,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "& .MuiChip-label":{
      padding:0
    }
  };

  return (
    <Chip icon={icon} label={label} variant={variant} {...props} sx={ChipSx} />
  );
};

export default SeederChip;
