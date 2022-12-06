import React, { useEffect, useState } from "react";
import TheMain from "./Components/TheMain";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Deadline from "./Pages/Deadline/Deadline";
import Event from "./Pages/Event/Event";
import Routine from "./Pages/Routine/Routine";
import Motivation from "./Pages/Motivation/Motivation";
import { styled } from "@mui/material";
import Box from "@mui/material/Box";
import FireError from "./Components/Error";
import Error from "./Pages/404/Error";
import Welcome from "./Pages/Welcome/Welcome";
import { io } from "socket.io-client";
import { useDispatch } from "react-redux";
import { messageFromServer } from "./Redux/Action/systemAction";
import MotivationalBar from "./Components/MotivationalBar";
import { getMotivationQuote } from "./Services/service.dashboard";
import axios from 'axios'
// import Protected from "./Protected";
let socket;

export const MainWrapper = styled(Box)({
  ".main-wrap": {
    display: "flex",
    height: "calc(100vh - 100px)",
  },
  ".mainContent": {
    width: "100%",
  },
});

function App() {
  const dispatch = useDispatch();
  const [fireSensor, setFireSensor] = useState(false);
  const [motiveTags, setMotiveTags] = useState([
    { tagName: "reward-based", active: true },
    { tagName: "attitude", active: true },
    { tagName: "fear-based", active: true },
    { tagName: "creative", active: false },
    { tagName: "competence", active: false },
    { tagName: "power", active: false },
    { tagName: "incentive", active: false },
    { tagName: "alone", active: false },
    { tagName: "art", active: false },
    { tagName: "attitude", active: false },
    { tagName: "courage", active: false },
    { tagName: "dreams", active: false },
    { tagName: "education", active: false },
    { tagName: "equality", active: false },
    { tagName: "experience", active: false },
    { tagName: "failure", active: false },
    { tagName: "faith", active: false },
    { tagName: "fear", active: false },
    { tagName: "freedom", active: false },
    { tagName: "happiness", active: false },
    { tagName: "imagination", active: false },
    { tagName: "inspirational", active: false },
    { tagName: "intelligence", active: false },
    { tagName: "knowledge", active: false },
    { tagName: "leadership", active: false },
  ]);

  const getAlerts = () => {
    axios
      .get("https://io.adafruit.com/api/v2/Dhairya_Bhatt/feeds/fire-sensor", {
        headers: {
          "X-AIO-Key": "aio_qPJU06A1oTR3zGQQSMT1oV4aHdPf",
        },
      })
      .then((res) => {
        if (res.data.last_value === "ON") {
          setFireSensor(true);
        } else if (res.data.last_value === "OFF") {
          setFireSensor(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const [quote, setQuote] = useState(
    "If there is no struggle, there is no progress."
  );
  useEffect(() => {
    initiateSocketConnection();
    const interval = setInterval(() => getAlerts(), 3000);
    return () => {
      clearInterval(interval);
      disconnectSocket();
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    let timerID = setInterval(() => {
      getMotiveText();
    }, 5 * 60 * 1000);
    return () => {
      clearInterval(timerID);
    };
    // eslint-disable-next-line
  }, []);

  const getMotiveText = async () => {
    let response = await getMotivationQuote({
      categories: motiveTags,
    });
    setQuote(response?.data?.[0]?.text);
  };

  const initiateSocketConnection = () => {
    socket = io(process.env.REACT_APP_SOCKET_ENDPOINT);
    console.log(`Connecting socket...`);

    socket.on("notification", (data) => {
      console.log("Notification.....", data);
      dispatch(messageFromServer(data));
    });
  };

  const disconnectSocket = () => {
    console.log("Disconnecting socket...");
    if (socket) socket.disconnect();
  };
  // const [isLogged, setIsLogged] = useState(true);
  // useEffect(() => {
  //   const access_token = sessionStorage.getItem("accessToken");
  //   if (!access_token) {
  //     setIsLogged(false);
  //   }
  // }, []);
  // const navigate = useNavigate();
  // const location = useLocation();

  // useEffect(() => {
  //   if (location.pathname === "/") {
  //     if (sessionStorage.getItem("accessToken") === "") {
  //       navigate("/login");
  //     } else {
  //       navigate("/dashboard");
  //     }
  //   }
  //   // eslint-disable-next-line
  // }, []);

  return (
    <MainWrapper>
      {fireSensor && <FireError />}
      <MotivationalBar quote={quote} />
      <div className="main-wrap">
        <Routes>
          <Route
            path="/"
            element={
              // <Protected isLogged={isLogged}>
              <TheMain />
              // </Protected>
            }
          >
            <Route
              path="/dashboard"
              element={
                // <Protected isLogged={isLogged}>
                <Dashboard />
                // </Protected>
              }
            />
            <Route
              path="/routine"
              element={
                // <Protected isLogged={isLogged}>
                <Routine />
                // </Protected>
              }
            />
            <Route
              path="/event"
              element={
                // <Protected isLogged={isLogged}>
                <Event />
                // </Protected>
              }
            />
            <Route
              path="/deadline"
              element={
                // <Protected isLogged={isLogged}>
                <Deadline />
                // </Protected>
              }
            />
            <Route
              path="/motivation"
              element={
                // <Protected isLogged={isLogged}>
                <Motivation
                  motiveTags={motiveTags}
                  setMotiveTags={setMotiveTags}
                />
                // </Protected>
              }
            />
            <Route
              path="*"
              element={
                // <Protected isLogged={isLogged}>
                <Error />
                // </Protected>
              }
            />
          </Route>
          <Route
            path="/login"
            element={
              // sessionStorage.getItem("accessToken") ? (
              // <Navigate to="/dashboard" replace />
              // ) : (
              <Welcome />
              // )
            }
          />
        </Routes>
      </div>
    </MainWrapper>
  );
}

export default App;
