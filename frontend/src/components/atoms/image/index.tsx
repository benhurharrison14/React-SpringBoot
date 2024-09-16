import React from "react";

interface ImgProps {
  src?: string;
  width?: string | number;
  height?: string | number;
  style?: React.CSSProperties;
  alt?: string;
}

export default function Image({
  src,
  width,
  height,
  alt,
  style,
}: Readonly<ImgProps>) {
  return (
    <img src={src} alt={alt} width={width} height={height} style={style} />
  );
}
