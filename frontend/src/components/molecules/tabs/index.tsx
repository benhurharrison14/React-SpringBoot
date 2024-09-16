import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { styled } from "@mui/material";
import theme from "../../../utils/themes";
import { TabContext, TabPanel } from "@mui/lab";
import SeederTypography from "../../atoms/typography";

const StyledTabs = styled(Tab)({
  display: "flex",
  borderRadius: "12px",
  padding: "12px 24px",
  gap: "8px",
  justifyContent: "center",
  alignItems: "center",
  textTransform: "capitalize",
  border: `1px solid ${theme.palette.border.highemp}`,
  background: theme.palette.gray[100],
  color: theme.palette.textColor.medemp,
  "&.Mui-selected": {
    border: `1px solid ${theme.palette.purple[400]}`,
    background: theme.palette.purple[600],
    color: theme.palette.purple[400],
  },
});

export interface ITabsProps {
  contractContent: React.ReactNode;
  myCashKickContent: React.ReactNode;
}

const SeederTabs = ({ contractContent, myCashKickContent }: ITabsProps) => {
  const [value, setValue] = React.useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <TabContext value={value.toString()}>
      <Tabs
        onChange={handleChange}
        value={value}
        aria-label="Tabs where each tab needs to be selected manually"
        sx={{
          ".MuiTabs-flexContainer": { display: "flex", gap: "12px" },
          "& .MuiTabs-indicator": {
            display: "none",
          },
        }}
      >
        <StyledTabs
          label={<SeederTypography variant="button1" text="My Contracts" />}
          tabIndex={0}
        />
        <StyledTabs
          label={<SeederTypography variant="button1" text="My Cash Kicks" />}
          tabIndex={1}
        />
      </Tabs>
      <TabPanel value="0">{contractContent}</TabPanel>
      <TabPanel value="1">{myCashKickContent}</TabPanel>
    </TabContext>
  );
};

export default SeederTabs;
