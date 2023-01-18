import axios from "axios";
import {
  getAccessKey,
  deleteAccessKey,
  setAccessKey,
  ACCESS_KEY,
} from "./LocalStorageManager";

export const AxiosClient = axios.create({
  baseURL: process.env.REACT_APP_SERVER_BASE_URL,
  withCredentials: true,
  headers: {
    "Access-Control-Allow-Origin": "http://localhost:3000",
  },
});
AxiosClient.interceptors.request.use((request) => {
  if (request.url !== "/auth/sign-up") {
    const accessKey = getAccessKey(ACCESS_KEY);
    request.headers["Authorization"] = `Bearer ${accessKey}`;
  }
  return request;
});

AxiosClient.interceptors.response.use(async (response) => {
  const requestedFrom = response.config;
  const data = response.data;
  //IMPLIES FOR ALL CALLS
  if (data.status === "OK") {
    return data;
  } else if (
    (data.statusCode === 401 &&
      requestedFrom.url === "/user/refresh-access-token") ||
    (data.status === "ERROR" && requestedFrom.url === "/posts/all")
  ) {
    deleteAccessKey(ACCESS_KEY);
    window.location.replace("/login");
    return Promise.reject(data);
  }
  //IMPLIES FOR ONLY ACCESS-TOKEN-EXPIRY
  else if (data.statusCode === 401 && requestedFrom.url === "/posts/all") {
    const result = await AxiosClient.get("/user/refresh-access-token");
    if (result.status === "OK") {
      setAccessKey(ACCESS_KEY, result.result.New_Access_Token);
      const finalResult = await AxiosClient.get(requestedFrom.url);
      return finalResult;
    }
  }
  else if (requestedFrom.url.includes('/auth')) {
    
  }
  //FOR ANY NON-TOKEN-ERRORS PASS DATA TO HANDLE ON THE PARTICULAR PAGE
  return data;
});
