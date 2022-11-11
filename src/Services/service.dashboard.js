import { ApiPath } from "../views/api-path/secure_api";
import secureAxios from "./secureAxios";

export const getAllTask = async () => {
  try {
    let response = await secureAxios({
      url: ApiPath,
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
      method: "post",
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
      method: "get",
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
      method: "delete",
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const updateEventById = async (id,data) => {
  try {
    let response = await secureAxios({
      url: `updateEvent/${id}`,
      method: "patch",
      data: data,
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};
