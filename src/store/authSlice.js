import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { isLoggedIn: false, name: "alaa" },
  reducers: {
    logInOut: (state) => {
      state.isLoggedIn = !state.isLoggedIn;
    },
  },
});

export const { logInOut } = authSlice.actions;

export default authSlice.reducer;
