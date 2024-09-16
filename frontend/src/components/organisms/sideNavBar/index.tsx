import { Box, styled } from "@mui/material";
import React, { useState } from "react";
import theme from "../../../utils/themes";
import IconLabel from "../../molecules/iconLabel";
import seeder from "../../../../public//images/seeder-icon.svg";
import home from "../../../../public//images/home.svg";
import selectedcashAcceleration from "../../../../public/images/accelerationIcon.svg";
import cashAcceleration from "../../../../public/images/unselectedCashAcceleration.svg";
import selectedHome from "../../../../public/images/selectedHome.svg";
import thunder from "../../../../public/images/thunder.svg";
import { SideNavBarConstants } from "../../../utils/constants";
import { useNavigate } from "react-router-dom";

const StyledBox = styled(Box)({
  width: "250px",
  height: "100vh",
  padding: "40px 20px 20px 20px",
  backgroundColor: theme.palette.background.elevation1,
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: "40px",
});

const NavButtons = styled(Box)({
  width: "100%",
  height: "6vh",
  padding: "16px",
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  borderRadius: "12px",
  cursor: "pointer",
});

interface SideNavBarProps {
  homeButton: boolean;
}

export const SideNavBar = ({ ...props }: SideNavBarProps) => {
  const [homeButton, setHomeButton] = useState(props.homeButton);
  const [cashAccelerationButton, setCashAccelerationButton] = useState(
    !props.homeButton
  );
  const navigate = useNavigate();

  const handleHomeClick = () => {
    setHomeButton(true);
    setCashAccelerationButton(false);
    navigate("/home");
  };

  const handleCashAccelerationClick = () => {
    setCashAccelerationButton(true);
    setHomeButton(false);
    navigate("/cash-acceleration");
  };

  return (
    <StyledBox>
      <Box>
        <IconLabel
          typographyVariant={"heading2"}
          typographyText={SideNavBarConstants.header}
          typographySx={{ color: theme.palette.textColor.highemp }}
          iconSrc={seeder}
          iconAltText={"No Icon"}
          iconFirst={true}
          sx={{
            gap: "8px",
            justifyContent: "flex-end",
          }}
        />
      </Box>
      <Box height={"83vh"} width={"100%"}>
        <NavButtons
          onClick={handleHomeClick}
          sx={
            homeButton
              ? { backgroundColor: theme.palette.background.elevation2 }
              : {}
          }
        >
          <IconLabel
            typographyVariant={"button2"}
            typographyText={SideNavBarConstants.button1}
            typographySx={{
              color: homeButton
                ? theme.palette.textColor.highemp
                : theme.palette.textColor.lowemp,
            }}
            iconSrc={homeButton ? selectedHome : home}
            iconAltText={""}
            iconFirst={true}
            sx={{ gap: "8px" }}
          />
        </NavButtons>
        <NavButtons
          onClick={handleCashAccelerationClick}
          sx={
            cashAccelerationButton
              ? { backgroundColor: theme.palette.background.elevation2 }
              : {}
          }
        >
          <IconLabel
            typographyVariant={"button2"}
            typographyText={SideNavBarConstants.button2}
            typographySx={{
              color: cashAccelerationButton
                ? theme.palette.textColor.highemp
                : theme.palette.textColor.lowemp,
            }}
            iconSrc={
              cashAccelerationButton
                ? selectedcashAcceleration
                : cashAcceleration
            }
            iconAltText={""}
            iconFirst={true}
            sx={{ gap: "8px" }}
          />
        </NavButtons>
      </Box>
      <Box>
        <IconLabel
          typographyVariant={"button2"}
          typographyText={SideNavBarConstants.footer}
          typographySx={{ color: theme.palette.textColor.lowemp }}
          iconSrc={thunder}
          iconAltText={"No Icon"}
          iconFirst={true}
          sx={{ gap: "8px" }}
        />
      </Box>
    </StyledBox>
  );
};
