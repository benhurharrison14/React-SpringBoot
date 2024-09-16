import { Checkbox as MuiCheckbox, CheckboxProps as MuiCheckboxProps } from "@mui/material";
import React from "react";
import SeederIcons from "../icon";
import uncheckIcon from "../../../../public/images/uncheckIcon.svg"
import checkIcon from "../../../../public/images/checkIcon.svg"
import indeterminateIcon from "../../../../public/images/indeterminateIcon.svg"

interface CheckboxProps extends MuiCheckboxProps{
  onChange?: () => void;
  indeterminate?: boolean
}

const Checkbox = ({ ...props }: CheckboxProps) => {
  return (
        <MuiCheckbox
          onChange={props.onChange}
          disableRipple
          icon={<SeederIcons src={uncheckIcon} alt={"unchecked icon"}/>}
          checkedIcon={<SeederIcons src={checkIcon} alt={"checked icon"}/>}
          indeterminateIcon={<SeederIcons src={indeterminateIcon} alt={"indeterminate icon"}/>}
          indeterminate = {props.indeterminate}
          checked={props.checked}
        />
  );
};

export default Checkbox;
