import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isLoading: false,
};
const appConfigSlicer = createSlice({
  name: "appConfigSlice",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export default appConfigSlicer.reducer;

export const { setLoading } = appConfigSlicer.actions;
