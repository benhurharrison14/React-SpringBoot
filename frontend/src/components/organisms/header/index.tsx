import { Box } from "@mui/material";
import React from "react";
import SeederTypography from "../../atoms/typography";
import theme from "../../../utils/themes";
import LogoutScreen from "../logoutScreen";
import styled from "@emotion/styled";
import { useAppContext } from "../../../context";

interface HeaderProps {
  headerContent: string;
  headerFooter: string;
}

const MainContainer = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  width: "100%",
  alignItems: "flex-start",
});

const Header = ({ ...props }: HeaderProps) => {
  const {userName} = useAppContext()
  return (
    <MainContainer>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <SeederTypography
          variant="title"
          text={props.headerContent}
          sx={{ color: theme.palette.textColor.highemp }}
        />
        <SeederTypography
          variant="heading3"
          text={props.headerFooter}
          sx={{ color: theme.palette.textColor.lowemp }}
        />
      </Box>
      <LogoutScreen
        userName={userName}
        dropdownPosition={true}
      />
    </MainContainer>
  );
};

export default Header;
