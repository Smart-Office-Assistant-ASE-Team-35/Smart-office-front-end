import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/system";
import CustomLoader from "../ReUsable/CustomLoader";
import { getAllTask, getCityWeather } from "../../Services/service.dashboard";
import WeatherUi from "./WeatherUi";
import DeadlineSection from "./DeadlineSection";
import RoutineSection from "./RoutineSection";
// import EventSection from "./EventSection";
import moment from "moment";
import IotSection from "./IotSection";
// import { useDispatch } from "react-redux";

const DashboardWrapper = styled("div")({
  position: "relative",
  margin: "-30px",
  height: "calc(100vh - 178px)",
  ".column-container": {
    height: "100%",
  },
  ".css-8v0fa4-MuiGrid-root": {
    height: "100%",
  },
  ".column-wrapper": {
    padding: "30px",
    height: "100%",
    position: "relative",
    h3: {
      marginBottom: "16px",
    },
  },
  ".border": {
    border: "1px solid #E7E7E7",
    borderWidth: "0px 1px 0px 1px",
  },
  h4: {
    fontSize: "18px",
    lineHeight: "22px",
  },
});

function Dashboard() {
  // const dispatch = useDispatch();
  const geolocationAPI = navigator.geolocation;
  const [loader, setLoader] = useState(false);
  const [allEvents, setAllEvents] = useState([]);
  const [weatherData, setWeatherData] = useState({});

  useEffect(() => {
    document.title = "Dashboard";
    setLoader(true);
    getTaskData();
    getWeatherData();
    // handleTokenFromQueryParams();
    // eslint-disable-next-line
  }, []);

  const getTaskData = async () => {
    let response = await getAllTask();
    let _allEvents = response?.data;
    setAllEvents(_allEvents);
    setLoader(false);
  };

  const getWeatherData = () => {
    if (!geolocationAPI) {
      console.log("Geolocation API is not available in your browser!");
    } else {
      geolocationAPI.getCurrentPosition(
        async (position) => {
          const { coords } = position;
          let response = await getCityWeather({
            lat: coords.latitude.toFixed(2),
            long: coords.longitude.toFixed(2),
          });
          setWeatherData(response?.data);
        },
        () => {
          console.log("Something went wrong getting your position!");
        }
      );
    }
  };

  // const handleTokenFromQueryParams = async () => {
  //   const query = new URLSearchParams(window.location.search);
  //   const accessToken = query.get("accessToken");
  //   const refreshToken = query.get("refreshToken");
  //   const expirationDate = newExpirationDate();
  //   console.log("App.js 30 | expiration Date", expirationDate);
  //   if (accessToken && refreshToken) {
  //     storeTokenData(accessToken, refreshToken, expirationDate);
  //     dispatch({
  //       type: "SET_LOGIN_LOGOUT",
  //       payload: true,
  //     });
  //   }
  // };

  // const newExpirationDate = () => {
  //   var expiration = new Date();
  //   expiration.setHours(expiration.getHours() + 1);
  //   return expiration;
  // };

  // const storeTokenData = async (token, refreshToken, expirationDate) => {
  //   sessionStorage.setItem("accessToken", token);
  //   sessionStorage.setItem("refreshToken", refreshToken);
  //   sessionStorage.setItem("expirationDate", expirationDate);
  // };

  return (
    <DashboardWrapper>
      {loader && <CustomLoader />}
      <Grid
        container
        columns={{ xs: 4, sm: 8, md: 12 }}
        className="column-container"
      >
        <Grid item xs={2} sm={4} md={4}>
          <Box className="column-wrapper">
            <h3>Routine</h3>
            <RoutineSection
              allEvents={allEvents?.filter(
                (data) =>
                  (!data.recurringEventId && !data.event_type) ||
                  data.recurringEventId
              )?.filter(
                (event) =>
                  moment(event.start.dateTime).format("D MMM YYYY") ===
                  moment().format("D MMM YYYY")
              )}
            />
          </Box>
        </Grid>
        <Grid item xs={2} sm={4} md={4}>
          <Box className="column-wrapper border">
            <h3>Deadlines</h3>
            <DeadlineSection
              allEvents={allEvents?.filter(
                (data) => data.event_type === "Deadline"
              )}
            />
          </Box>
        </Grid>
        <Grid item xs={2} sm={4} md={4}>
          <Box className="column-wrapper">
            <h3>Device Status</h3>
            {/* <EventSection
              allEvents={allEvents?.filter(
                (data) => !data.recurringEventId && !data.event_type
              )}
            /> */}
            <IotSection/>
            {weatherData && Object.keys(weatherData)?.length ? (
              <WeatherUi weatherData={weatherData} />
            ) : (
              ""
            )}
          </Box>
        </Grid>
      </Grid>
    </DashboardWrapper>
  );
}

export default React.memo(Dashboard);
