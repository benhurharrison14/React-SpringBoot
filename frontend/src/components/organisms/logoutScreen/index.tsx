import React, { useState } from "react";
import { Box, Popover, styled } from "@mui/material";
import Avatar from "../../atoms/avatar";
import profile from "../../../../public/images/profile.svg";
import downArrow from "../../../../public/images/downArrow.svg";
import SeederIcons from "../../atoms/icon";
import SeederTypography from "../../atoms/typography";
import theme from "../../../utils/themes";
import {
  LOGOUT_DROPDOWN_EDIT_PROFILE,
  LOGOUT_DROPDOWN_ITEM_INFO,
  LOGOUT_ICON_LABEL_ITEMS,
} from "../../../utils/constants";
import SeederDivider from "../../atoms/divider";
import IconLabel from "../../molecules/iconLabel";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useAppContext } from "../../../context";

interface LogoutScreenProps {
  userName?: string;
  dropdownPosition: boolean;
}

const StyledMenuItems = styled("div")({
  display: "flex",
  padding: "16px",
  gap: "12px",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
});

const CustomPopover = styled(Popover)({
  "& .MuiPaper-root": {
    maxWidth: "250px",
    minHeight: "310px",
    backgroundColor: theme.palette.gray[100],
    borderRadius: "12px",
    border: `1px solid ${theme.palette.border.lowemp}`,
    padding: "20px",
  },
  "& .MuiList-root": {
    padding: "0px !important",
    display: "flex",
    gap: "15px !important",
    flexDirection: "column",
  },
});

const LogoutScreen = ({ ...props }: LogoutScreenProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const { logout } = useAuth0();
  const {setUserId} = useAppContext()

  const handleDropDown = (e: {
    currentTarget: React.SetStateAction<null | HTMLElement>;
  }) => {
    setAnchorEl(e.currentTarget);
  };

  const handleDropDownClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleDropDownClose();
    setUserId(0)
    sessionStorage.clear()
    navigate("/");
    //add functionality to logout
    logout();
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          maxWidth: "56px",
          minHeight: "32px",
          gap: "8px",
          alignItems: "center",
          position: "relative",
        }}
        onClick={handleDropDown}
      >
        <Avatar
          alt={"profile icon"}
          src={profile}
          sx={{ borderRadius: "12px", cursor: "pointer" }}
        />
        <SeederIcons src={downArrow} alt={"down arrow icon"} />
      </Box>
      <CustomPopover
        open={open}
        anchorEl={anchorEl}
        onClose={handleDropDownClose}
        disableAutoFocus={true}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <StyledMenuItems>
          <Box sx={{ display: "flex", flexDirection: "row", gap: "12px" }}>
            <Avatar
              alt={"profile icon"}
              src={profile}
              sx={{ borderRadius: "12px" }}
            />
            <Box
              sx={{ display: "flex", flexDirection: "column", height: "42px" }}
            >
              <SeederTypography
                variant="heading3"
                text={props.userName}
                sx={{ color: theme.palette.textColor.highemp }}
              />
              <SeederTypography
                variant="caption"
                text={LOGOUT_DROPDOWN_EDIT_PROFILE}
                sx={{ color: theme.palette.purple[400] }}
              />
            </Box>
          </Box>
        </StyledMenuItems>
        <Box sx={{ marginLeft: "16px" }}>
          <SeederDivider
            type="login"
            sx={{
              backgroundColor: theme.palette.border.highemp,
              height: "1px",
            }}
          />
        </Box>
        <StyledMenuItems>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "30px" }}>
            {LOGOUT_DROPDOWN_ITEM_INFO.map((item) => (
              <SeederTypography
                variant="button2"
                text={item}
                sx={{
                  color: theme.palette.textColor.lowemp,
                  textTransform: "none",
                }}
                key={item}
              />
            ))}
          </Box>
        </StyledMenuItems>
        <Box sx={{ marginLeft: "16px" }}>
          <SeederDivider
            type="login"
            sx={{
              backgroundColor: theme.palette.border.highemp,
              height: "1px",
            }}
          />
        </Box>
        <StyledMenuItems>
          {LOGOUT_ICON_LABEL_ITEMS.map((item, index) => (
            <Box
              key={item.id}
              onClick={index === 1 ? handleLogout : undefined}
              sx={{
                padding: "2.5px",
                marginTop: index === 1 ? "12px" : "unset",
                cursor: index === 1 ? "pointer" : "none",
                alignSelf: "flex-start",
              }}
            >
              <IconLabel
                typographyVariant="button2"
                typographyText={item.name}
                typographySx={{
                  color:
                    index === 0
                      ? theme.palette.textColor.lowemp
                      : theme.palette.accent.red,
                }}
                iconSrc={item.src}
                iconAltText={item.altText}
                iconFirst={true}
                sx={{
                  gap: "12px",
                }}
              />
            </Box>
          ))}
        </StyledMenuItems>
      </CustomPopover>
    </>
  );
};

export default LogoutScreen;
