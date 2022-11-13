import React from "react";
import { Button } from "@mui/material";
import styled from "styled-components";

function CustomButton({ variant, onClick, text, icon }) {
  const containBtn =
    variant === "contained"
      ? {
          background: "#5030E5 !important",
          color: "#FFFFFF !important",
        }
      : {
          background: "transparent !important",
          color: "#5030E5 !important",
        };
  const ButtonContain = styled(Button)({
    ...containBtn,
    fontWeight: "500 !important",
    fontSize: "20px !important",
    lineHeight: "30px !important",
    textTransform: "capitalize !important",
    padding: "8px 15px !important",
    minWidth: "125px !important",
    fontFamily: "'Poppins', sans-serif !important",
    svg: {
      marginRight: "6px !important",
    },
  });
  return (
    <ButtonContain variant={variant} onClick={onClick}>
      {icon} {text}
    </ButtonContain>
  );
}

export default CustomButton;
