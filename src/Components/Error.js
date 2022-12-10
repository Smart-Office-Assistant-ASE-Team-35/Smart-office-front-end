import {Button} from "@mui/material";
import axios from "axios";
import React from "react";

function Error(props) {
  const errorWrapperCss = {
    position: "absolute",
    height: "100vh",
    width: "100vw",
    zIndex: 1000,
    background: "#ff0030b3",
    display: "flex",
    justifyContent: "center",
    placeItems: "center",
  }
  return (
    <div
      style={props.fireSensor ? errorWrapperCss : {...errorWrapperCss,display:"none"}}
      onMouseOver={()=>{
        var audio = document.getElementById("audio");
        audio.play();
      }}
    >
      <audio
        id="audio"
        controls
        autoPlay
        style={{disply:"none"}}
>   
          <source src="/warnning.mp3" type="audio/mpeg"></source>
    </audio>
      <div style={{textAlign: "center"}}>
        <h1 style={{color: "white"}}>Fire Emergency</h1>
        <br />
        <h2 style={{color: "white"}}>Please Call 911...</h2>
        <br />
        <h4 style={{color: "white"}}>
          please click below Button to Turn Off Alert
        </h4>
        <br />
        <Button
          style={{
            background: "#ffff",
            color: "darkred",
            padding: "10px 20px",
            fontWeight: "600",
          }}
          onClick={()=>{
            axios.post("https://io.adafruit.com/api/v2/webhooks/feed/8fJ2KA6GgoZXJadCNMTkRSwADk4T",{
                value:"OFF"
            });
          }}
        >
          Turn Off Alarm
        </Button>
      </div>
    </div>
  );
}

export default Error;
