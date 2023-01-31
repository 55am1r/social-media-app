import { configureStore } from "@reduxjs/toolkit";
import appConfigReducer from "./Slices/appConfigSlice";
import userReducer from "./Slices/userSlice";
import profileReducer from "./Slices/UserSlices/GetUserInfo";
export default configureStore({
  reducer: {
    appConfigReducer,
    user: userReducer,
    profileReducer,
  },
});
