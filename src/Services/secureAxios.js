import axios from "axios";
import { ApiPath } from "../views/api-path/secure_api";

const secureAxios = axios.create({
  baseURL: ApiPath,
  headers: {
    "Access-Control-Allow-Origin":"*"
  },
});

export default secureAxios;
