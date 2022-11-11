import { InputLabel, TextField } from "@mui/material";
import React from "react";
import styled from "styled-components";

export function CustomLabel({ htmlFor, label, color }) {
  return (
    <InputLabel
      htmlFor={htmlFor}
      style={{
        fontWeight: "400",
        fontSize: "20px",
        lineHeight: "30px",
        color: color || "#081424",
        fontFamily: "Poppins",
        marginBottom: "6px",
      }}
    >
      {label}
    </InputLabel>
  );
}

const StyledTextField = styled(TextField)({
  ".css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
    border: "1px solid #A5A5A5",
    borderRadius: "6px",
  },
  ".css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
    {
      border:  (props)=> `1px solid ${props.color || "#D8D0FF"}`,
    },
});

export function CustomInput({
  id,
  label,
  variant,
  name,
  value,
  onChange,
  colortheme,
}) {
  return (
    <StyledTextField
      id={id}
      label={label}
      variant={variant}
      colortheme={colortheme}
      name={name}
      value={value}
      onChange={onChange}
    />
  );
}
