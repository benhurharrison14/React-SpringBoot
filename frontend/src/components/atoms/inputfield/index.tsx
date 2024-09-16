import React from "react";
import { InputProps, TextField, styled } from "@mui/material";
import theme from "../../../utils/themes";

interface InputFieldProps {
  value?: string;
  type?: string;
  placeholder?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  sx?: React.CSSProperties;
  inputProps?: InputProps;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  createCashKick?: boolean;
  name?: string;
  helperText?: string;
  error?: boolean;
  disabled?: boolean;
}

interface StyledProps {
  value?: string;
}

export const StyledInput = styled(TextField)((props: StyledProps) => ({
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: theme.palette.border.highemp,
    },
    "&:hover fieldset": {
      borderColor: theme.palette.purple[400],
    },
    "&.Mui-focused fieldset": {
      borderColor: theme.palette.purple[400],
    },
  },
  "& .MuiOutlinedInput-input": {
    ...theme.typography.body1,
    color: props.value
      ? theme.palette.textColor.medemp
      : theme.palette.textColor.lowemp,
    padding: 0,
  },
  "& .MuiInputBase-root": {
    borderRadius: "12px",
    height: "56px",

    background: `${theme.palette.gray[100]}`,
    color: `${theme.palette.textColor.medemp}`,
    padding: `${theme.spacing(3)} ${theme.spacing(4)}`,
  },
  "& .MuiFormHelperText-root": {
    marginLeft: 0,
  },
}));

const InputField = ({
  inputProps,
  sx,
  placeholder,
  value,
  type,
  onChange,
  onFocus,
  onBlur,
  createCashKick,
  name,
  helperText,
  error,
  disabled,
}: InputFieldProps) => {
  return (
    <StyledInput
      data-testid="input-field"
      fullWidth
      placeholder={placeholder}
      variant="outlined"
      value={value}
      type={type}
      onChange={onChange}
      name={name}
      InputProps={inputProps}
      sx={{
        ...sx,
        "& .MuiInputBase-root": {
          color: createCashKick
            ? theme.palette.textColor.medemp
            : theme.palette.purple[400],
          background: createCashKick
            ? theme.palette.gray[50]
            : theme.palette.gray[100],
        },
      }}
      onFocus={onFocus}
      onBlur={onBlur}
      helperText={helperText}
      error={error}
      disabled={disabled}
    />
  );
};

export default InputField;
