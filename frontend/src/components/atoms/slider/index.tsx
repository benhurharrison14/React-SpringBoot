import React from "react";
import { Slider, SliderProps, SxProps } from "@mui/material";
import theme from "../../../utils/themes";

export interface CustomSliderProps extends Omit<SliderProps, "onChange"> {
  onChange?: (
    event: Event,
    value: number | number[],
    activeThumb: number
  ) => void;
  max: number;
  sx?: SxProps;
}

const CustomSlider = ({ onChange, max, sx, ...rest }: CustomSliderProps) => {
  const handleChange = (event: Event, newValue: number | number[]) => {
    if (onChange) {
      onChange(event, newValue as number, 0);
    }
  };

  return (
    <Slider
      onChange={handleChange}
      max={max}
      sx={{
        ...sx,
        maxWidth: "330px",
        height: "8px",
        color: `${theme.palette.purple[500]}`,
        "& .MuiSlider-rail": { color: `${theme.palette.gray[50]}` },
        "& .MuiSlider-thumb": {
          borderRadius: "8px",
          border: `3px solid ${theme.palette.purple[400]}`,
          "&:hover": {
            boxShadow: "none",
          },
          "&.Mui-active": {
            boxShadow: "none",
          },
        },
      }}
      {...rest}
    />
  );
};

export default CustomSlider;
