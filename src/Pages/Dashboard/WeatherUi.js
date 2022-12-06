import { styled } from "@mui/material";
import React, { useEffect, useState } from "react";
import { ReactComponent as Wind } from "../../Assets/svg/wind.svg";
import { ReactComponent as Drop } from "../../Assets/svg/drop.svg";
import { ReactComponent as Cloud } from "../../Assets/svg/cloud.svg";
import { ReactComponent as Location } from "../../Assets/svg/location.svg";
// import ReactHighCharts from "react-highcharts";
import HiChart from "./HiChart";
import moment from "moment";

const WeatherWrap = styled("div")({
  position: "absolute",
  bottom: "0px",
  right: "0px",
  width: "100%",
  padding: "0px 15px 10px 15px",
  transition: "0.3s",
  background: "linear-gradient(124.55deg, #5030E5 3.51%, #7F68EB 99.35%)",
  ".weather-header": {
    padding: "10px",
    ".temp-wrap": {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: "5px",
      ".temp-title": {
        fontWeight: "500",
        fontSize: "22px",
        lineHeight: "33px",
        color: "#FFFFFF",
      },
      ".city-wrap": {
        display: "flex",
        alignItems: "center",
        svg: {
          marginRight: "10px",
        },
        ".city-pera": {
          fontWeight: "500",
          fontSize: "16px",
          lineHeight: "24px",
          color: "#FFFFFF",
        },
      },
    },
    ".celsius-wrap": {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      ".celsius-value": {
        maxWidth: "30%",
        width: "100%",
        ".celsius-title": {
          fontWeight: "600",
          fontSize: "48px",
          lineHeight: "50px",
          color: "#FFFFFF",
          sup: {
            color: "#FFFFFF",
            fontSize: "28px",
          },
        },
        ".celsius-date": {
          fontWeight: "500",
          fontSize: "16px",
          lineHeight: "24px",
          color: "#E8E3FF",
        },
      },
      ".current-wrap": {
        maxWidth: "60%",
        width: "100%",
        display: "flex",
        alignItems: "center",
        ".current-box": {
          maxWidth: "33.33%",
          width: "100%",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "center",
          svg: {
            marginBottom: "10px",
          },
          p: {
            fontWeight: "500",
            fontSize: "16px",
            lineHeight: "26px",
            color: "#E8E3FF",
          },
        },
      },
    },
  },
  ".weather-footer": {
    height: "50%",
    width: "100%",
    background: "#866EF3",
    borderRadius: "6px",
    padding: "10px",
    ".today-wrap": {
      fontSize: "18px",
      lineHeight: "27px",
      color: "#FFFFFF",
    },
    ".temp-chart": {
      padding: "0 35px",
      ".highcharts-graph": {
        stroke: "#F5F5F5",
      },
      ".highcharts-point": {
        fill: "#FFFFFF",
      },
    },
    ".today-row": {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      margin: "0 -10px",
      ".today-col": {
        padding: "0 10px",
        maxWidth: "33.33%",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        ".temp": {
          fontWeight: "600",
          fontSize: "20px",
          lineHeight: "30px",
          color: "#FFFFFF",
          sup: {
            color: "#FFFFFF",
            fontSize: "14px",
          },
        },
        ".time": {
          fontWeight: "400",
          fontSize: "16px",
          lineHeight: "24px",
          color: "#FFFFFF",
        },
      },
    },
  },
});

let _config = {
  chart: {
    type: "spline",
    height: "55px",
    backgroundColor: "transparent",
  },
  series: [
    {
      data: [0, 0, 0, 0],
    },
  ],
  yAxis: { visible: false },
  xAxis: { visible: false },
  legend: { enabled: false },
  credits: { enabled: false },
  title: { text: null },
  tooltip: { enabled: false },
};

function WeatherUi({ weatherData }) {
  let date = moment().format("hh:mm A").toString();
  const [config, setConfig] = useState({ ..._config });
  const [currentDate, setCurrentDate] = useState(date);
  const [cityObj, setCityObj] = useState({
    country: "country",
    state: "state",
  });

  const tick = () => {
    setCurrentDate(moment().format("hh:mm A").toString());
  };

  useEffect(() => {
    let timerID = setInterval(() => {
      tick();
    }, 1000);
    return () => {
      clearInterval(timerID);
    };
  }, []);

  useEffect(() => {
    if (Object.keys(weatherData)?.length) {
      _config = {
        ...config,
        series: [
          {
            data: [
              parseInt(weatherData?.morning_temp?.toFixed()),
              parseInt(weatherData?.afternoon_temp?.toFixed()),
              parseInt(weatherData?.evening_temp?.toFixed()),
              parseInt(weatherData?.night_temp?.toFixed()),
            ],
          },
        ],
      };
      let arrayOfLocation =
        weatherData?.location?.[0]?.formattedAddress.split(",");
      setCityObj({
        city: arrayOfLocation[2],
        state: arrayOfLocation[3],
      });
      setConfig({ ..._config });
    }
    // eslint-disable-next-line
  }, [weatherData]);

  return (
    <>
      <WeatherWrap
        className="weather-wrapper"
        style={{
          visibility: Object.keys(weatherData).length ? "visible" : "hidden",
          opacity: Object.keys(weatherData).length ? 1 : 0,
        }}
      >
        <div className="weather-header">
          <div className="temp-wrap">
            <div className="temp-title">Weather</div>
            <div className="city-wrap">
              <Location />
              <div className="city-pera">
                {cityObj.city}, {cityObj.state}
              </div>
            </div>
          </div>
          <div className="celsius-wrap">
            <div className="celsius-value">
              <div className="celsius-title">
                {weatherData?.current_temp?.toFixed() || "00"}
                <sup>0</sup>
              </div>
              <div className="celsius-date">
                Today, {currentDate || "00:00 PM"}
              </div>
            </div>
            <div className="current-wrap">
              <div className="current-box">
                <Wind />
                <p>{weatherData?.windSpeed || "00"}km/h</p>
              </div>
              <div className="current-box">
                <Drop />
                <p>{weatherData?.current_humidity || "00"}%</p>
              </div>
              <div className="current-box">
                <Cloud />
                <p>{weatherData?.rainSum || "00"}%</p>
              </div>
            </div>
          </div>
        </div>
        <div className="weather-footer">
          <div className="today-wrap">Today’s Temperature</div>
          <div className="temp-chart">
            <HiChart config={config} />
          </div>
          <div className="today-row">
            <div className="today-col">
              <div className="temp">
                {weatherData?.morning_temp?.toFixed()}
                <sup>0</sup>
              </div>
              <div className="time">Morning</div>
            </div>
            <div className="today-col">
              <div className="temp">
                {weatherData?.afternoon_temp?.toFixed()}
                <sup>0</sup>
              </div>
              <div className="time">Afternoon</div>
            </div>
            <div className="today-col">
              <div className="temp">
                {weatherData?.evening_temp?.toFixed()}
                <sup>0</sup>
              </div>
              <div className="time">Evening</div>
            </div>
            <div className="today-col">
              <div className="temp">
                {weatherData?.night_temp?.toFixed()}
                <sup>0</sup>
              </div>
              <div className="time">Night</div>
            </div>
          </div>
        </div>
      </WeatherWrap>
    </>
  );
}

export default React.memo(WeatherUi);
