import React from "react";

export interface IIconProps{
  src: string;
  alt: string;
  style?: object;
  testId?: string;
  onClick?: React.MouseEventHandler<HTMLImageElement>;
}

const SeederIcons = ({ src, alt, style, testId, onClick }: IIconProps) => {
  return (
    <img
      data-testid={testId}
      src={src}
      alt={alt}
      style={{ ...style, cursor: "pointer" }}
      onClick={onClick}
    />
  );
};

export default SeederIcons;
