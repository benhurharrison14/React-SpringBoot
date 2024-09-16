import { Box, Stack, styled } from "@mui/material";
import React from "react";
import theme from "../../../utils/themes";
import Image from "../../atoms/image";

const StyledDiv = styled("div")`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 20rem;
  @media (max-width: 1800px) {
    margin-left: 8rem;
  }
`;

interface SigninSignupTemplateProps {
  bodyNode: React.ReactNode;
  imageSrc: string;
}

const SigninSignupTemplate = ({ ...props }: SigninSignupTemplateProps) => {
  return (
    <Box
      width="100vw"
      height="100vh"
      sx={{ background: theme.palette.background.elevation0 }}
    >
      <Stack direction="row">
        <Image
          src={props.imageSrc}
          alt="login-panel image"
          style={{ display: "flex", height: "100vh", width: "39%" }}
        />
        <StyledDiv>{props.bodyNode}</StyledDiv>
      </Stack>
    </Box>
  );
};

export default SigninSignupTemplate;
