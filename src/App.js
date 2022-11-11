import React from "react";
import TheMain from "./Components/TheMain";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Deadline from "./Pages/Deadline/Deadline";
import Event from "./Pages/Event/Event";
import Routine from "./Pages/Routine/Routine";
import Motivation from "./Pages/Motivation/Motivation";
import { styled } from "@mui/material";
import Box from "@mui/material/Box";
import Error from "./Pages/404/Error";

export const MainWrapper = styled(Box)({
  display: "flex",
  ".mainContent": {
    width: "100%",
  },
});

function App() {
  return (
    <MainWrapper>
      <Routes>
        <Route path="/" element={<TheMain />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/routine" element={<Routine />} />
          <Route path="/event" element={<Event />} />
          <Route path="/deadline" element={<Deadline />} />
          <Route path="/motivation" element={<Motivation />} />
          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
    </MainWrapper>
  );
}

export default App;
