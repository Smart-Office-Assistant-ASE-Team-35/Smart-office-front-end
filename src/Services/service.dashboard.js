import { ApiPath } from "../views/api-path/secure_api";
import secureAxios from "./secureAxios";
import axios from 'axios'
export const getAllTask = async () => {
  try {
    let response = await secureAxios({
      url: ApiPath,
      method: "GET",
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getGoogleEvent = async () => {
  try {
    let response = await secureAxios({
      url: "/getGoogleEvents",
      method: "get",
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const createEventApi = async (data) => {
  try {
    let response = await secureAxios({
      url: "/createEvent",
      method: "POST",
      data: data,
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getEventById = async (id) => {
  try {
    let response = await secureAxios({
      url: `/getEvent/${id}`,
      method: "GET",
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getDailyEventById = async (id) => {
  try {
    let response = await secureAxios({
      url: `/getDailyEvent/${id}`,
      method: "GET",
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const deleteEventById = async (id) => {
  try {
    let response = await secureAxios({
      url: `/deleteEvent/${id}`,
      method: "DELETE",
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const updateEventById = async (id, data) => {
  try {
    let response = await secureAxios({
      url: `/updateEvent/${id}`,
      method: "PATCH",
      data: data,
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const updateDeadline = async (id, data) => {
  try {
    let response = await secureAxios({
      url: `/updateDeadline/${id}`,
      method: "PATCH",
      data: data,
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getCityWeather = async (data) => {
  try {
    let response = await secureAxios({
      url: "/GetWeather",
      method: "POST",
      data: data,
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const createGoogleAuthLink = async () => {
  try {
    let response = await secureAxios({
      url: "/createAuthLink",
      method: "POST",
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const googleRedirect = async () => {
  try {
    let response = await secureAxios({
      url: "/handleGoogleRedirect",
      method: "POST",
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const createValidToken = async () => {
  try {
    let response = await secureAxios({
      url: "/getValidToken",
      method: "POST",
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const userLogIn = async (data) => {
  try {
    let response = await secureAxios({
      url: "/Login",
      data: data,
      method: "POST",
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getMotivationQuote = async (data) => {
  try {
    let response = await secureAxios({
      url: "/getQuotes",
      data: data,
      method: "post",
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const setLight = async (data) => {
  try {
    let response = axios.post("https://io.adafruit.com/api/v2/webhooks/feed/xAxfoeMkxDjUydNXiNhhYEnvNxqt",{
      value:data
    })
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const setDoor = async (data) => {
  try {
    let response = axios.post("https://io.adafruit.com/api/v2/webhooks/feed/6P1zywvH5XgJmF3MFsCMArCaPCGc",{
      value:data
    })
    return response;
  } catch (error) {
    console.log(error);
  }
};