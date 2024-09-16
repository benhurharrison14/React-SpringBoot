import { Box, SxProps, TypographyProps } from "@mui/material";
import React from "react";
import SeederTypography from "../../atoms/typography";
import SeederIcons from "../../atoms/icon";

interface IconLabelProps {
  typographyVariant: TypographyProps["variant"];
  typographyText: string;
  typographySx: SxProps;
  iconSrc: string;
  iconAltText: string;
  iconStyle?: React.CSSProperties
  iconFirst: boolean;
  sx:SxProps
}

const IconLabel = ({ ...props }: IconLabelProps) => {
  return (
    <Box
      sx={{
        ...props.sx,
        display: "flex",
        flexDirection: props.iconFirst ? "row-reverse" : "row",
        alignItems: "center",
        justifyContent:"center",
        flexWrap:"wrap"
      }}
      data-testid="icon-label"
    >
      <SeederTypography
        text={props.typographyText}
        variant={props.typographyVariant}
        sx={props.typographySx}
      />
      <SeederIcons
        src={props.iconSrc}
        alt={props.iconAltText}
        style={props.iconStyle}
      />
    </Box>
  );
};

export default IconLabel;
