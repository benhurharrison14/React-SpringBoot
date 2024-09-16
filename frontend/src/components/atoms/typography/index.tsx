import React, { ReactNode } from "react";
import { Typography, TypographyProps } from "@mui/material";

interface ITypographyProps extends TypographyProps {
  text: ReactNode;
  testId?: string;
}

const SeederTypography = ({
  text,
  testId,
  ...typographyProps
}: ITypographyProps) => (
  <Typography data-testid={testId} {...typographyProps}>
    {text}
  </Typography>
);

export default SeederTypography;
