import { Avatar as MuiAvatar, SxProps } from "@mui/material";
import React from "react";

interface AvatarProps {
  alt: string;
  src: string;
  sx?: SxProps;
}

const Avatar = ({ ...props }: AvatarProps) => {
  return <MuiAvatar {...props} variant="square" data-testid="avatar"/>;
};

export default Avatar;
