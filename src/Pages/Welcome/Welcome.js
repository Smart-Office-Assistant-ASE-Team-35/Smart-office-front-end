import React, { useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import CustomButton from "../ReUsable/CustomButton";
import { CustomLabel, CustomInput } from "../ReUsable/CustomFormControl";

const WelcomeWrap = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  background: "#5030E5",
  height: "100vh",
  width: "100%",
  h1: { color: "#fff", marginBottom: "40px" },
  ".form-wrapper": {
    maxWidth: "540px",
    width: "100%",
    textAlign: "center",
    label: {
      textAlign: "left",
    },
    ".MuiFormControl-root": {
      width: "100%",
      ".MuiInputBase-input": {
        borderColor: "#fff !important",
        color: "#fff !important",
      },
      ".MuiInputBase-input:hover .MuiOutlinedInput-notchedOutline": {
        borderColor: "#fff !important",
      },
    },
    button: {
      background: "#fff !important",
      color: "#5030E5 !important",
      marginTop: "40px",
    },
  },
});
function Welcome() {
  const [sysName, setSysName] = useState("");
  // const systemName = useSelector((state) => state.systemReducer.systemName);
  // const dispatch = useDispatch();
  const handelChange = (event) => {
    setSysName(event.target.value);
    // dispatch({
    //   type: "SYSTEM_NAME",
    //   value,
    // });
  };
  return (
    <>
      <WelcomeWrap>
        <h1>Welcome to System</h1>
        <div className="form-wrapper">
          <CustomLabel htmlFor="systemName" label="System name" color="#fff" />
          <CustomInput
            id="systemName"
            colortheme="#fff"
            variant="outlined"
            name={"systemName"}
            value={sysName}
            onChange={(e) => {
              handelChange(e);
            }}
          />
          <CustomButton variant={"contained"} text={"Next"} />
        </div>
      </WelcomeWrap>
    </>
  );
}

export default Welcome;
