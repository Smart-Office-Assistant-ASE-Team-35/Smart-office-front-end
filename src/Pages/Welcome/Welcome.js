import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
import styled from "styled-components";
// import CustomButton from "../ReUsable/CustomButton";
import { CustomLabel, CustomInput } from "../ReUsable/CustomFormControl";
// import { ReactComponent as Google } from "../../Assets/svg/Google.svg";
import { userLogIn } from "../../Services/service.dashboard";
import CustomButton from "../ReUsable/CustomButton";
import { FormControl, FormHelperText } from "@mui/material";
import { errorCss } from "../Deadline/DeadlineModel";

export const WelcomeWrap = styled("div")({
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
      marginBottom: "20px",
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
// const logInStyle = {
//   fontFamily: "Poppins",
//   fontWeight: "500",
//   fontSize: "16px",
//   lineHeight: "40px",
//   padding: "0 21px",
//   borderRadius: "20px",
//   cursor: "pointer",
//   marginBottom: "16px",
//   boxSizing: "border-box",
//   border: "1px solid #d6d9dc",
//   textAlign: "center",
//   background: "#FFF",
//   color: "#535a60",
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
//   gap: "10px",
// };
function Welcome() {
  // const navigate = useNavigate();
  // const dispatch = useDispatch();
  // const [sysName, setSysName] = useState("");
  // const systemName = useSelector((state) => state.systemReducer.systemName);
  // const isLogin = useSelector((state) => state.systemReducer.isLogin);
  const [userObj, setUserObj] = useState({
    googleClientEmail: "",
    googlePrivateKey: "",
  });
  const [validation, setValidation] = useState(false);

  // const googleAuthLink = async () => {
  //   let response = await createGoogleAuthLink();
  //   console.log(response?.data);
  //   if (response?.data?.url !== "") {
  //     window.open(response.data.url, "_top");
  //   }
  // };

  const handelChange = (event) => {
    const { value, name } = event.target;
    setUserObj({
      ...userObj,
      [name]: value,
    });
  };

  // const goToDashBoard = () => {
  //   if (systemName !== "" && isLogin) {
  //     navigate("/dashboard");
  //   }
  // };
  const handelLogIn = async () => {
    if (
      Object.values(userObj)?.some((value) => value === "" || value === " ")
    ) {
      setValidation(true);
    } else {
      let response = await userLogIn({
        client_Email: userObj.googleClientEmail,
        client_private_key: userObj.googlePrivateKey,
        project_id: userObj.project_id,
        private_key_id: userObj.private_key_id,
        client_id: userObj.client_id,
      });
      console.log(response);
    }
  };

  return (
    <>
      <WelcomeWrap>
        <h1>Welcome to System</h1>
        {/* log in page form */}
        {/* <div className="form-wrapper">
          <CustomLabel
            htmlFor="googleClientEmail"
            label="google client email"
            color="#fff"
          />
          <FormControl fullWidth>
            <CustomInput
              id="googleClientEmail"
              colortheme="#fff"
              variant="outlined"
              name={"googleClientEmail"}
              value={userObj.googleClientEmail}
              onChange={(e) => {
                handelChange(e);
              }}
            />
            {userObj.googleClientEmail === "" && validation ? (
              <FormHelperText style={errorCss}>
                This is required!
              </FormHelperText>
            ) : (
              ""
            )}
          </FormControl>
          <CustomLabel
            htmlFor="googlePrivateKey"
            label="google private key"
            color="#fff"
          />
          <FormControl fullWidth>
            <CustomInput
              id="googlePrivateKey"
              colortheme="#fff"
              variant="outlined"
              name={"googlePrivateKey"}
              value={userObj.googlePrivateKey}
              onChange={(e) => {
                handelChange(e);
              }}
            />
            {userObj.googlePrivateKey === "" && validation ? (
              <FormHelperText style={errorCss}>
                This is required!
              </FormHelperText>
            ) : (
              ""
            )}
          </FormControl>
          <CustomLabel
            htmlFor="project_id"
            label="google project id"
            color="#fff"
          />
          <FormControl fullWidth>
            <CustomInput
              id="project_id"
              colortheme="#fff"
              variant="outlined"
              name={"project_id"}
              value={userObj.project_id}
              onChange={(e) => {
                handelChange(e);
              }}
            />
            {userObj.project_id === "" && validation ? (
              <FormHelperText style={errorCss}>
                This is required!
              </FormHelperText>
            ) : (
              ""
            )}
          </FormControl>
          <CustomLabel
            htmlFor="private_key_id"
            label="google private key id"
            color="#fff"
          />
          <FormControl fullWidth>
            <CustomInput
              id="private_key_id"
              colortheme="#fff"
              variant="outlined"
              name={"private_key_id"}
              value={userObj.private_key_id}
              onChange={(e) => {
                handelChange(e);
              }}
            />
            {userObj.private_key_id === "" && validation ? (
              <FormHelperText style={errorCss}>
                This is required!
              </FormHelperText>
            ) : (
              ""
            )}
          </FormControl>
          <CustomLabel
            htmlFor="client_id"
            label="google client id"
            color="#fff"
          />
          <FormControl fullWidth>
            <CustomInput
              id="client_id"
              colortheme="#fff"
              variant="outlined"
              name={"client_id"}
              value={userObj.client_id}
              onChange={(e) => {
                handelChange(e);
              }}
            />
            {userObj.client_id === "" && validation ? (
              <FormHelperText style={errorCss}>
                This is required!
              </FormHelperText>
            ) : (
              ""
            )}
          </FormControl>
          <CustomButton
            variant={"contained"}
            text={"Login"}
            onClick={() => {
              handelLogIn();
            }}
          />
        </div> */}
        <div className="form-wrapper">
          <CustomLabel htmlFor="systemName" label="System Name" color="#fff" />
          <FormControl fullWidth>
            <CustomInput
              id="systemName"
              colortheme="#fff"
              variant="outlined"
              name={"systemName"}
              value={userObj.systemName}
              onChange={(e) => {
                handelChange(e);
              }}
            />
            {userObj.googleClientEmail === "" && validation ? (
              <FormHelperText style={errorCss}>
                This is required!
              </FormHelperText>
            ) : (
              ""
            )}
            <CustomButton
              variant={"contained"}
              text={"Login"}
              onClick={() => {
                handelLogIn();
              }}
            />
          </FormControl>
        </div>
        {/* <div style={logInStyle} onClick={googleAuthLink}>
          <Google />
          Log in with Google
        </div> */}
        {/* {!isLogin ? (
        ) : (
          <div className="form-wrapper">
            <CustomLabel
              htmlFor="systemName"
              label="System name"
              color="#fff"
            />
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
            <CustomButton
              variant={"contained"}
              text={"Next"}
              onClick={() => {
                goToDashBoard();
              }}
            />
          </div>
        )} */}
      </WelcomeWrap>
    </>
  );
}

export default Welcome;
