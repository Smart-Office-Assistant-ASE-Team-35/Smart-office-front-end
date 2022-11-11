import React, { useEffect } from "react";
import TheSidebar from "./TheSidebar";
import { styled } from "@mui/material";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
// import Welcome from "../Pages/Welcome/Welcome";

export const SystemName = styled("div")({
  height: "100px",
  width: "100%",
  background: "#EDE9FF",
  display: "flex",
  alignItems: "center",
  padding: "0px 30px",
  h2: {
    color: "#5030E5",
  },
});
function TheMain() {
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (location.pathname === "/") {
      navigate("/dashboard");
    }
    // eslint-disable-next-line
  }, [location.pathname, navigate]);

  return (
    <>
      {/* { ? <Welcome />  : <></> } */}
      <TheSidebar />
      <div className="mainContent">
        <SystemName>
          <h2>System name</h2>
        </SystemName>
        <div style={{ padding: "30px", height: "auto" }}>
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default TheMain;
