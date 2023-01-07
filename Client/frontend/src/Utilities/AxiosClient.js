import axios from "axios";
import { checkNavigate } from "../Views/LandingPage/RequireAccess";
import { getItemKey, deleteKey, setKey } from "./LocalStorageManager";

export const AxiosClient = axios.create({
  baseURL: process.env.REACT_APP_SERVER_BASE_URL,
  withCredentials: true,
});
AxiosClient.interceptors.request.use((request) => {
  const accessKey = getItemKey();
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
    data.statusCode === 401 &&
    requestedFrom.url === "/user/refresh-access-token"
  ) {
    deleteKey();
    window.location.replace("/login");
    checkNavigate(false);
    return Promise.reject(data);
  }
  //IMPLIES FOR ONLY ACCESS-TOKEN-EXPIRY
  else if (data.statusCode === 401 && requestedFrom.url === "/posts/all") {
    const result = await AxiosClient.get("/user/refresh-access-token");
    if (result.status === "OK") {
      setKey(result.result.New_Access_Token);
      const finalResult = await AxiosClient.get(requestedFrom.url);
      return finalResult;
    }
  }
  //FOR ANY NON-TOKEN-ERRORS PASS DATA TO HANDLE ON THE PARTICULAR PAGE
  return data;
});
