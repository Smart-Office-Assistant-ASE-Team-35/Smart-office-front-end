import React, {useEffect, useState} from "react";
import TheMain, {SystemName} from "./Components/TheMain";
import {Routes, Route} from "react-router-dom";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Deadline from "./Pages/Deadline/Deadline";
import Event from "./Pages/Event/Event";
import Routine from "./Pages/Routine/Routine";
import Motivation from "./Pages/Motivation/Motivation";
import {styled} from "@mui/material";
import Box from "@mui/material/Box";
import FireError from "./Components/Error";
import Error from "./Pages/404/Error";
import Welcome from "./Pages/Welcome/Welcome";
import {io} from "socket.io-client";
import {useDispatch, useSelector} from "react-redux";
import {messageFromServer} from "./Redux/Action/systemAction";
import MotivationalBar from "./Components/MotivationalBar";
import {getMotivationQuote} from "./Services/service.dashboard";
import { useSpeechSynthesis } from 'react-speech-kit';
import {setSensorData} from "./Redux/Action/systemAction";
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
  const {speak, saking} = useSpeechSynthesis();
  const fireStatus = useSelector(state => state.systemReducer.fireStatus)
  const [motiveTags, setMotiveTags] = useState([
    {tagName: "reward-based", active: true},
    {tagName: "attitude", active: true},
    {tagName: "fear-based", active: true},
    {tagName: "creative", active: false},
    {tagName: "competence", active: false},
    {tagName: "power", active: false},
    {tagName: "incentive", active: false},
    {tagName: "alone", active: false},
    {tagName: "art", active: false},
    {tagName: "attitude", active: false},
    {tagName: "courage", active: false},
    {tagName: "dreams", active: false},
    {tagName: "education", active: false},
    {tagName: "equality", active: false},
    {tagName: "experience", active: false},
    {tagName: "failure", active: false},
    {tagName: "faith", active: false},
    {tagName: "fear", active: false},
    {tagName: "freedom", active: false},
    {tagName: "happiness", active: false},
    {tagName: "imagination", active: false},
    {tagName: "inspirational", active: false},
    {tagName: "intelligence", active: false},
    {tagName: "knowledge", active: false},
    {tagName: "leadership", active: false},
  ]);
  var timerState;
  const [quote, setQuote] = useState(
    "If there is no struggle, there is no progress.",
  );
  useEffect(() => {
    initiateSocketConnection();
    const interval = setInterval(() =>dispatch(setSensorData()) , 3000);
    return () => {
      disconnectSocket();
      clearInterval(interval);
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    let timerID = setInterval(() => {
      getMotiveText();
    }, 2 * 60 * 1000);
    return () => {
      clearInterval(timerID);
    };
    // eslint-disable-next-line
  }, []);

  // useEffect(()=>{
  //     speak({text:"Hello ", lang: "en-IN"});
  // },[fireStatus])
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

  return (
    <MainWrapper>
      <FireError fireSensor={fireStatus}/>
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
