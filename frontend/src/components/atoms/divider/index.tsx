import React from "react";
import Divider, { DividerProps } from "@mui/material/Divider";

interface IDividerProps extends DividerProps {
  testId?: string;
  type: "summary" | "login";
  sx?: object;
  children?: React.ReactNode;
}



const SeederDivider = ({ children, sx, ...props }: IDividerProps) => {
  return (
    <Divider {...props} sx={sx}>
      {children}
    </Divider>
  );
};

export default SeederDivider;
