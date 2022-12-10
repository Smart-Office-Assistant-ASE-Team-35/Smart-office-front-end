import {
  SET_LOGIN_LOGOUT,
  SET_MOTIVE_QUOTE,
  SET_NOTIFY_MESSAGE,
  SYSTEM_NAME,
  SET_SENSOR_DATA
} from "../ActionType/systemType";

import axios from "axios";

export const setSystemName = (payload) => {
  return {
    type: SYSTEM_NAME,
    payload,
  };
};

export const isUserLoggedIn = (payload) => {
  return {
    type: SET_LOGIN_LOGOUT,
    payload,
  };
};

export const messageFromServer = (payload) => {
  return {
    type: SET_NOTIFY_MESSAGE,
    payload,
  };
};

export const setMotiveQuotes = (payload) => {
  return {
    type: SET_MOTIVE_QUOTE,
    payload,
  };
};

export const setSensorData = (payload) => {
  return (dispatch) => {
    axios
      .get("https://io.adafruit.com/api/v2/Dhairya_Bhatt/groups/default", {
        headers: {
          "X-AIO-Key": "aio_qPJU06A1oTR3zGQQSMT1oV4aHdPf",
        },
      })
      .then((res) => {
        let doorStatus = false;
        let fireStatus = false;
        let lightValue = 0;
        res.data.feeds.map((sensorData) => {
          if (sensorData.key === "door-status") {
            if (sensorData.last_value === "0") {
              doorStatus = false;
            } else {
              doorStatus = true;
            }
          }
          if (sensorData.key === "fire-sensor") {
            if (sensorData.last_value === "OFF") {
              fireStatus = false;
            } else {
              fireStatus = true;
            }
          }
          if (sensorData.key === "office-light") {
            if (sensorData.last_value) {
              let intValue = parseInt(sensorData.last_value) / 2.5;
              lightValue = intValue
            }
          }
        });
        dispatch({
          type: SET_SENSOR_DATA,
          payload: {
            doorStatus,
            fireStatus,
            lightValue
          },
        });
      })
      .catch((err) => {
        // console.log(err);
      });
  };
};
