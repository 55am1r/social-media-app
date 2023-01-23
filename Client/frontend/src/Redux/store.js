import { configureStore } from "@reduxjs/toolkit";
import appConfigReducer from "./Slices/appConfigSlice";
import userReducer from "./Slices/userSlice";
export default configureStore({
  reducer: {
    appConfigReducer,
    user: userReducer,
  },
});
