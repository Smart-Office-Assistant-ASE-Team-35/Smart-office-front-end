import React from "react";
import { styled } from "@mui/material";
import Box from "@mui/material/Box";
import CustomButton from "./CustomButton";

const TitleWButtonWrapper = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: "25px",
});

function TitleWButton({ title, btnIcon, btnText, handelOpen }) {
  return (
    <>
      <TitleWButtonWrapper>
        <h3>{title}</h3>
        {btnText && (
          <CustomButton
            icon={btnIcon}
            text={btnText}
            variant={"contained"}
            onClick={handelOpen}
          />
        )}
      </TitleWButtonWrapper>
    </>
  );
}

export default TitleWButton;
