import React from "react";
import Image from "../../atoms/image";
import { styled } from "@mui/system";
import Button from "../../atoms/button";
import theme from "../../../utils/themes";
import SeederTypography from "../../atoms/typography";

const MainContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  alignItems: 'center'
});

const ChildrenContainer = styled("div")({
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    alignItems: 'center'
})


export interface IEmptyCashAcclerationProps {
  children: React.ReactNode;
  src: string;
  alt: string;
  button: boolean;
  text?: string;
  handleButtonClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const EmptyCashAccleration = ({src, alt, children, button, text, handleButtonClick }: IEmptyCashAcclerationProps) => {
  return (
    <MainContainer>
      <Image
        src={src}
        alt={alt}
        style={{ width: "232px", height: "160px" }}
      />
      <ChildrenContainer>
      {children}
      {button && 
        <Button
          variant="text"
          backgroundColor="transparent"
          sx={{ color: theme.palette.purple[400] }}
          onClick={handleButtonClick}
        >
          <SeederTypography
            variant="button1"
            sx={{ color: theme.palette.purple[400] }}
            text={text}
          />
        </Button>
      }
      </ChildrenContainer>
    </MainContainer>
  );
};

export default EmptyCashAccleration;
