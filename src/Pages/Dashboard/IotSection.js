import React, {useEffect, useState} from "react";
import {Box, FormControlLabel, Slider, Switch, Typography} from "@mui/material";
import styled from "styled-components";
import axios from "axios";
import {setLight, setDoor} from "../../Services/service.dashboard"
import {useSelector} from "react-redux"
const IotWrapper = styled(Box)({});

const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(() => ({
  width: "42px !important",
  height: "26px !important",
  padding: "0px !important",
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(20px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: "#5030E5",
        opacity: 1,
        border: 0,
        padding: "10px",
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#33cf4d",
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color: "gray",
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: 0.7,
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: "22px",
    height: "22px",
    background: "#fff",
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: "#E9E9EA",
    opacity: 1,
    transition: "0.3s",
  },
}));

const PretToSlider = styled(Slider)({
  color: "#52af77 !important",
  height: "8px !important",
  "& .MuiSlider-track": {
    border: "none",
  },
  "& .MuiSlider-thumb": {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
      boxShadow: "inherit",
    },
    "&:before": {
      display: "none",
    },
  },
  "& .MuiSlider-valueLabel": {
    lineHeight: 1.2,
    fontSize: 12,
    background: "unset",
    padding: 0,
    width: 32,
    height: 32,
    borderRadius: "50% 50% 50% 0",
    backgroundColor: "#52af77",
    transformOrigin: "bottom left",
    transform: "translate(50%, -100%) rotate(-45deg) scale(0)",
    "&:before": {display: "none"},
    "&.MuiSlider-valueLabelOpen": {
      transform: "translate(50%, -100%) rotate(-45deg) scale(1)",
    },
    "& > *": {
      transform: "rotate(45deg)",
    },
  },
});

function IotSection() {
  const doorStatus = useSelector(state => state.systemReducer.doorStatus)
  const lightValue = useSelector(state => state.systemReducer.lightValue)
  const [lightIntensity, setLightIntensity] = useState(lightValue);
  const [doorState, setDoorState] = useState(doorStatus);
  const handleToggle = (e) => {
    setDoorState(e.target.checked);
    if(e.target.checked){
      setDoor("1");
    } else {
      setDoor("0");
    }
  };
  var timerState;
  return (
    <IotWrapper>
      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          marginBottom: "10px",
        }}
      >
        <div>Door Status :</div>
        <div style={{marginLeft: "auto"}}>
          <FormControlLabel
            control={
              <IOSSwitch
                checked={doorState}
                onChange={(e) => {
                  handleToggle(e)
                }}
                sx={{m: 1}}
              />
            }
          />
        </div>
      </div>
      <Typography gutterBottom>Light Intensity :</Typography>
      <PretToSlider
        valueLabelDisplay="auto"
        aria-label="pretto slider"
        value={lightIntensity}
        defaultValue={20}
        onChange={(event) => {
          setLightIntensity(event.target.value);
          clearTimeout(timerState);
          timerState = setTimeout(() => {
            let newValue = parseInt(event.target.value*2.5)
            setLight(newValue.toString());
          }, 1000);
          
        }}
      />
    </IotWrapper>
  );
}

export default IotSection;
