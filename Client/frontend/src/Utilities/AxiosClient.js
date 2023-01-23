import axios from "axios";
import { useDispatch } from "react-redux";
import { resetInitialStateAppConfig } from "../Redux/Slices/appConfigSlice";
import {
  getAccessKey,
  deleteAccessKey,
  setAccessKey,
  ACCESS_KEY,
  ACTIVE_BTN,
} from "./LocalStorageManager";

export const AxiosClient = axios.create({
  baseURL: process.env.REACT_APP_SERVER_BASE_URL,
  withCredentials: true,
  headers: {
    "Access-Control-Allow-Origin": "http://localhost:3000",
  },
});
AxiosClient.interceptors.request.use((request) => {
  const accessKey = getAccessKey(ACCESS_KEY);
  request.headers["Authorization"] = `Bearer ${accessKey}`;
  return request;
});

AxiosClient.interceptors.response.use(async (response) => {
  const requestedFrom = response.config;
  const data = response.data;
  //IMPLIES FOR ALL CALLS
  if (data.status === "OK") {
    return data;
  }
  //IMPLIES FOR ONLY REFRESH-TOKEN-EXPIRY
  else if (
    [404, 401].some((item) => {
      return item === data.statusCode;
    }) &&
    ["/auth/refresh-access-token"].some((item) => {
      return item === requestedFrom.url;
    })
  ) {
    const dispatch = useDispatch();
    deleteAccessKey(ACCESS_KEY);
    deleteAccessKey(ACTIVE_BTN);
    dispatch(resetInitialStateAppConfig());
    window.location.replace("/");
    return Promise.reject(data);
  }
  //IMPLIES FOR ONLY ACCESS-TOKEN-EXPIRY
  else if (
    data.statusCode === 401 &&
    data.errordetails === "Access Token Expired"
    // ["/posts/all", "user/get-my-profile"].some((item) => {
    //   return item === requestedFrom.url;
    // })
  ) {
    const result = await AxiosClient.get("/auth/refresh-access-token");
    if (result.status === "OK") {
      setAccessKey(ACCESS_KEY, result.result.New_Access_Token);
      const finalResult = await AxiosClient.get(requestedFrom.url);
      return finalResult;
    }
  }
  //FOR ANY NON-TOKEN-ERRORS PASS DATA TO HANDLE ON THE PARTICULAR PAGE
  return data;
});
