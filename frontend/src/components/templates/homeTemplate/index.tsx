import { styled } from "@mui/material";
import React from "react";
import { SideNavBar } from "../../organisms/sideNavBar";
import theme from "../../../utils/themes";

const MainContainer = styled("div")({
  display: "flex",
  flexDirection: "row",
  gap: "28px",
  background: theme.palette.background.elevation0,
  width: "100%",
});

const RightContainer = styled("div")({
  display: "flex",
  width: "calc(100% - 300px)",
  flexDirection: "column",
});

const HeaderContainer = styled("div")({
  display: "flex",
  marginTop: "40px",
  width: "100%",
});

const BodyContainer = styled("div")({
  display: "flex",
  flexDirection: "row",
  gap: "20px",
  justifyContent: "space-between",
  marginTop: "32px",
});

const FooterContainer = styled("div")({ display: "flex", marginTop: "20px" });

export interface IHomeTemplateProps {
  headerContent: React.ReactNode;
  bodyContent: React.ReactNode;
  footerContent?: React.ReactNode;
  currentPage: boolean;
}

const HomeTemplate = ({
  headerContent,
  bodyContent,
  footerContent,
  currentPage,
}: IHomeTemplateProps) => {
  return (
    <MainContainer>
      <SideNavBar homeButton={currentPage} />
      <RightContainer>
        <HeaderContainer>{headerContent}</HeaderContainer>
        <BodyContainer>{bodyContent}</BodyContainer>
        <FooterContainer>{footerContent}</FooterContainer>
      </RightContainer>
    </MainContainer>
  );
};

export default HomeTemplate;
