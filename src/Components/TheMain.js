import React, {useEffect, useState} from "react";
import TheSidebar from "./TheSidebar";
import {Button, getAccordionActionsUtilityClass, styled} from "@mui/material";
import {Outlet, useLocation, useNavigate} from "react-router-dom";
import {useSpeechRecognition, useSpeechSynthesis} from "react-speech-kit";
import axios from "axios";
import Error from "./Error";
import {getCityWeather,createEventApi,setLight,setDoor} from "../Services/service.dashboard";
import moment from "moment";
// import { useDispatch } from "react-redux";

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
  // const dispatch = useDispatch();
  const listOfMonth = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let deadlinePayload = {
    summary: "My first event!",
    location: "Hyderabad,India",
    description: "First event with nodeJS!",
    start: {
      dateTime: new Date(),
      timeZone: "Asia/Kolkata",
    },
    end: {
      dateTime: new Date(),
      timeZone: "Asia/Kolkata",
    },
    attendees: [],
    reminders: {
      useDefault: false,
      overrides: [
        {
          method: "email",
          minutes: 24,
        },
        {
          method: "popup",
          minutes: 10,
        },
      ],
    },
    event_type: "Deadline",
    event_status: "Pending",
    notified: "none",
  };
  const eventPayload = {
    summary: "My first event!",
    location: "Hyderabad,India",
    description: "First event with nodeJS!",
    start: {
      dateTime: new Date(),
      timeZone: "Asia/Kolkata",
    },
    end: {
      dateTime: new Date(),
      timeZone: "Asia/Kolkata",
    },
    attendees: [],
    reminders: {
      useDefault: false,
      overrides: [
        {
          method: "email",
          minutes: 24,
        },
        {
          method: "popup",
          minutes: 10,
        },
      ],
    },
    event_type: "TempararyEvent",
  };
  const date = moment().toString();
  const _eventForm = {
    eventName: "",
    startTime: date,
    endTime: date,
    eventDate: date,
    notifyTime: "none",
  };
  const navigate = useNavigate();
  const location = useLocation();
  // const [value, setValue] = useState('')
  const [activatedEvent, setActivatedEvent] = useState({
    type: "",
    date: "",
    title: "",
    time: "",
    endTime: "",
  });
  const [validation, setValidation] = useState(false);
  const systemName = "system";
  const {speak, speaking} = useSpeechSynthesis();
  const [timerID, setTimerID] = useState(null);
  const [weatherData, setWeatherData] = useState({});
  var timerState;
  const geolocationAPI = navigator.geolocation;
  const getWeatherData = () => {
    if (!geolocationAPI) {
      speak({
        text: "Geolocation API is not available in your browser!",
        lang: "en-IN",
      });
    } else {
      geolocationAPI.getCurrentPosition(
        async (position) => {
          const {coords} = position;
          let response = await getCityWeather({
            lat: coords.latitude.toFixed(2),
            long: coords.longitude.toFixed(2),
          });
          setWeatherData(response?.data);
        },
        () => {
          speak({
            text: "Something went wrong getting your position!",
            lang: "en-IN",
          });
          console.log("Something went wrong getting your position!");
        },
      );
    }
  };
  const createDaedLine = async () => {
    if (activatedEvent.title === "") {
      setValidation(true);
    } else {
      // setLoader(true);
      let startTime = moment(activatedEvent.time??new Date()).format("h:mm a").toString();
      let endTime = moment(activatedEvent.endTime).format("h:mm a").toString();
      let eventDate = moment(activatedEvent.date).format("L").toString();
      const _deadlinePayload = {
        ...deadlinePayload,
        summary: activatedEvent.title,
        description: activatedEvent.title,
        start: {
          dateTime: moment(startTime + " " + eventDate).format(
            "YYYY-MM-DDTHH:mm:ssZ"
          ),
          timeZone: "Asia/Kolkata",
        },
        end: {
          dateTime: moment(endTime + " " + eventDate).format(
            "YYYY-MM-DDTHH:mm:ssZ"
          ),
          timeZone: "Asia/Kolkata",
        },
        notified: _eventForm.notifyTime,
      };
      createEventApi({
            ..._deadlinePayload,
          }).then((response)=>{
            speak({text: `Event Created successfully.`});
          })
    }
  };
  const createEvent = async () => {
    let valid = true;
    if (activatedEvent.title === "") {
      valid(false);
    }
    if (!valid) {
      setValidation(!valid);
    } else {
      let startTime = moment(activatedEvent.time).format("h:mm a").toString();
      let endTime = moment(activatedEvent.endTime).format("h:mm a").toString();
      let eventDate = moment(activatedEvent.date).format("L").toString();
      let _eventPayload = {
        ...eventPayload,
        summary: activatedEvent.title,
        description: activatedEvent.title,
        start: {
          dateTime: moment(startTime + " " + eventDate).format(
            "YYYY-MM-DDTHH:mm:ssZ"
          ),
          timeZone: "Asia/Kolkata",
        },
        end: {
          dateTime: moment(endTime + " " + eventDate).format(
            "YYYY-MM-DDTHH:mm:ssZ"
          ),
          timeZone: "Asia/Kolkata",
        },
        event_type: "TempararyEvent",
      }
      createEventApi({
            ..._eventPayload,
          }).then((response)=>{
            speak({text: `Event Created successfully.`});
          })
      
    }
  };
  const voiceHandler = (value) => {
    try {
      if (
        value.toLowerCase().includes("door") &&
        (value.toLowerCase().includes("open") || value.toLowerCase().includes("on"))&&
        value.includes(systemName)
      ) {
        speak({text: "Door opend", lang: "en-IN"});
        setDoor("1");
        setActivatedEvent({});
        return;
      }
      if (
        value.toLowerCase().includes("door") &&
        (value.toLowerCase().includes("close")|| value.toLowerCase().includes("off")) &&
        value.includes(systemName)
      ) {
        speak({text: "Door Closed", lang: "en-IN"});
        setDoor("0");
        setActivatedEvent({});
        return;
      }
      if (
        value.toLowerCase().includes("light") &&
        value.toLowerCase().includes("on") &&
        value.toLowerCase().includes(systemName)
      ) {
        speak({text: "Lights Turn On", lang: "en-IN"});
        setLight("255")
        setActivatedEvent({});
        return;
      }
      if (
        value.toLowerCase().includes("light") &&
        value.toLowerCase().includes("off") &&
        value.toLowerCase().includes(systemName)
      ) {
        speak({text: "Lights Turn OFF"});
        setLight("0")
        console.log("Lights Turn Off");
        setActivatedEvent({});
        return;
      }
      if (
        value.includes("light") &&
        value.includes("low") &&
        value.includes(systemName)
      ) {
        speak({text: "Lights Change to low beem"});
        setLight("70")
        console.log("Lights Turn Off");
        setActivatedEvent({});
        return;
      }
      if (
        value.includes("light") &&
        (value.includes("moderate") ||
        value.includes("medium")) &&
        value.includes(systemName)
      ) {
        speak({text: "Lights Change to modrate beem"});
        setLight("125")
        console.log("Lights Turn Off");
        setActivatedEvent({});
        return;
      }
      if (
        value.includes("light") &&
        value.includes("extreme") &&
        value.includes(systemName)
      ) {
        speak({text: "Lights Change to Heigh beem"});
        setLight("250")
        console.log("Lights Turn Off");
        setActivatedEvent({});
        return;
      }
      if (
        (value.includes("today") || value.includes("current")) &&
        (value.includes("weather") || value.includes("temperature")) &&
        value.includes(systemName)
      ) {
        speak({
          text: `current temprature ${weatherData.current_temp} °C and windSpeed is ${weatherData.windSpeed} km/h`,
          lang: "en-IN",
        });
      }
      if (
        (value.includes("today") || value.includes("morning")) &&
        (value.includes("weather") || value.includes("temperature")) &&
        value.includes(systemName)
      ) {
        speak({
          text: `morning temprature is ${weatherData.morning_temp} °C`,
          lang: "en-IN",
        });
      }
      if (
        (value.includes("today") || value.includes("afternoon")) &&
        (value.includes("weather") || value.includes("temperature")) &&
        value.includes(systemName)
      ) {
        speak({
          text: `afternoon temprature is nearly ${weatherData.evening_temp} °C`,
          lang: "en-IN",
        });
      }
      if (
        (value.includes("today") || value.includes("evening")) &&
        (value.includes("weather") || value.includes("temperature")) &&
        value.includes(systemName)
      ) {
        speak({
          text: `Evening temprature is nearly ${weatherData.current_temp} °C`,
          lang: "en-IN",
        });
      }
      if (
        (value.includes("today") || value.includes("night")) &&
        (value.includes("weather") || value.includes("temperature")) &&
        value.includes(systemName)
      ) {
        speak({
          text: `Night temprature is nearly ${weatherData.night_temp} °C`,
          lang: "en-IN",
        });
      }
      if (
        value.includes("set") &&
        value.includes("event") &&
        value.includes(systemName)
      ) {
        speak({text: "Please tell date of event"});
        console.log("Please tell date for event");
        setActivatedEvent({type: "event"});
        return;
      }
      if (
        value.includes("set") &&
        value.includes("dead") &&
        value.includes("line") &&
        value.includes(systemName)
      ) {
        speak({text: "Please tell date of deadline"});
        console.log("Please tell date for deadlline");
        setActivatedEvent({type: "deadline"});
        return;
      }
      if (
        value.includes("system") &&
        activatedEvent?.type &&
        !activatedEvent?.date
      ) {
        try {
          let date = value.split(" ");
          let day, month, year;
          date.forEach((item) => {
            if (listOfMonth.includes(item)) {
              month = item;
            }
            if (
              /^[A-Za-z0-9]*$/.test(item) &&
              !/^[A-Za-z]*$/.test(item) &&
              !/^[0-9]*$/.test(item)
            ) {
              day = item.replace(/[A-Za-z]*$/, " ").trim();
            }
            if (item.match(/^[0-9]*$/) && item.length == 4) {
              year = item;
            }
          });
          console.log(value);
          let newValue = new Date(day + " " + month + ", " + year);
          if (newValue) {
            if (newValue > new Date()) {
              setActivatedEvent({...activatedEvent, date: newValue});
              if(activatedEvent.type !== "deadline"){
                speak({text: `Please tell Start time of  ${activatedEvent.type}`});
              } else {
              speak({text: `Please tell time of ${activatedEvent.type}`});
              }
            } else {
              speak({text: `Date should not lower than current date.`});
            }
          } else {
            throw "Did not get you";
          }

          return;
        } catch (e) {
          speak({text: `Sir, I did not catch you. please try again`});
        }
      }
      if (
        value.includes("system") &&
        activatedEvent?.type &&
        activatedEvent?.date &&
        !activatedEvent?.time
      ) {
        try {
          let dummyDate = new Date(activatedEvent?.date);
          let time = value.match(/[0-9][0-9]:[0-9][0-9]/)[0].split(":");
          let HH, MM;
          HH = time[0];
          MM = time[1];
          if (value.includes("p.m.")) {
            HH = parseInt(HH) + 12;
          }
          dummyDate.setHours(HH);
          dummyDate.setMinutes(parseInt(MM));
          setActivatedEvent({
            ...activatedEvent,
            time: dummyDate,
          });
          if(activatedEvent.type !== "deadline"){
            speak({text: `Please tell End time of  ${activatedEvent.type}`});
          } else {
            speak({text: `Please tell title of ${activatedEvent.type}`});
          }
        } catch (e) {
          speak({text: `Sir, I did not catch you. please try again`});
        }
        return;
      }
      if (
        value.includes("system") &&
        activatedEvent?.type &&
        activatedEvent?.date &&
        activatedEvent?.time &&
        !activatedEvent?.endTime &&
        activatedEvent.type !== "deadline"
      ) {
        try {
          let dummyDate = new Date(activatedEvent?.date);
          let time = value.match(/[0-9][0-9]:[0-9][0-9]/)[0].split(":");
          let HH, MM;
          HH = time[0];
          MM = time[1];
          if (value.includes("p.m.")) {
            HH = parseInt(HH) + 12;
          }
          dummyDate.setHours(HH);
          dummyDate.setMinutes(parseInt(MM));
          setActivatedEvent({
            ...activatedEvent,
            endTime: dummyDate,
          });
          speak({text: `Please tell title of ${activatedEvent.type}`});
        } catch (e) {
          speak({text: `Sir, I did not catch you. please try again`});
        }
        return;
      }
      if (
        value.includes("system") &&
        activatedEvent?.type &&
        activatedEvent?.date &&
        activatedEvent?.time &&
        !activatedEvent?.title
      ) {
        try{
          let title = value.replace("system title is", "");
          setActivatedEvent({...activatedEvent, title: title});
          console.log("data :");
          Object.keys(activatedEvent).forEach((item) => {
            console.log(`${item}  :`, activatedEvent[`${item}`]);
          });
          if(activatedEvent.type==='deadline'){
            createDaedLine();
          } else {
            createEvent();
          }
        }catch(e)
        {
          console.log(e);
        }
        return;
      }
    } catch (err) {
      console.log("Error :", err);
    }
    // eslint-disable-next-line
  };
  const {listen, listening, stop, supported} = useSpeechRecognition({
    onResult: (result) => {
      console.log("Called", result);
      clearTimeout(timerID);
      clearTimeout(timerState);
      timerState = setTimeout(() => {
        console.log("Called 2 :", result);
        voiceHandler(result);
      }, 1000);
      setTimerID(timerState);
    },
  });

  useEffect(async () => {
    getWeatherData();
    if (location.pathname === "/") {
      navigate("/dashboard");
    }
    const interval2 = setInterval(() => getWeatherData(), 120000);
    return () => {
      clearInterval(interval2);
    };
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    if (speaking && listening) {
      stop();
    } else if (!listening) {
      listen({lang: "en-IN"});
    }
  }, [speaking]);

  return (
    <>
      <TheSidebar logOut={() => {}} />
      <div className="mainContent">
        <SystemName>
          <h2>System name</h2>
          <Button
            style={{marginLeft: "auto"}}
            onClick={() => {
              if (listening) {
                stop();
              } else {
                listen({lang: "en-US"});
              }
            }}
          >
            Microphone
          </Button>
        </SystemName>
        {listening && <div>Go ahead I'm listening</div>}
        <div style={{padding: "30px", height: "auto"}}>
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default TheMain;
