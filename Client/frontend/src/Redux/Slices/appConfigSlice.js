import { createSlice } from "@reduxjs/toolkit";
import { getUserInfo } from "./serverSlice";
const initialState = {
  isLoading: false,
  profile: {},
};
const appConfigSlicer = createSlice({
  name: "appConfigSlice",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUserInfo.fulfilled, (state, action) => {});
  },
});

export default appConfigSlicer.reducer;

export const { setLoading } = appConfigSlicer.actions;
