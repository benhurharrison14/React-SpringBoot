import { Box, Stack, styled } from "@mui/material";
import React from "react";
import SeederIcons from "../../atoms/icon";
import tick from "../../../../public/images/circle-tick.svg";
import SeederTypography from "../../atoms/typography";
import theme from "../../../utils/themes";
import { ResetEmailMolecule } from "../../../utils/constants";

interface ResetEmailButtonProps {
  email?: string;
  resetEmail: boolean;
}

const StyledBox = styled(Box)({
  backgroundColor: `${theme.palette.background.elevation1}`,
  border: `${theme.palette.border.lowemp}`,
  width: "31vw",
  padding: "24px",
  borderRadius: "12px",
});

const ResetEmailSent = ({ email, resetEmail }: ResetEmailButtonProps) => {
  return (
    <StyledBox>
      <Stack direction={"row"} spacing={2} alignItems={"flex-start"}>
        <SeederIcons src={tick} alt={"Icon"} />
        <Stack direction={"column"} spacing={1}>
          <SeederTypography
            text={
              resetEmail
                ? ResetEmailMolecule.resetEmailTrueHeading
                : ResetEmailMolecule.resetEmailFalseHeading
            }
            variant="heading3"
            color={`${theme.palette.textColor.highemp}`}
          />
          <SeederTypography
            text={
              resetEmail ? (
                <>
                  {ResetEmailMolecule.resetEmailTrueFirstHalf}
                  <span style={{ color: `${theme.palette.purple[400]}` }}>
                    {email}
                  </span>
                  {ResetEmailMolecule.resetEmailSecondHalf}
                </>
              ) : (
                ResetEmailMolecule.resetEmailFalseMessage
              )
            }
            variant="body2"
            color={`${theme.palette.textColor.lowemp}`}
          />
        </Stack>
      </Stack>
    </StyledBox>
  );
};

export default ResetEmailSent;
