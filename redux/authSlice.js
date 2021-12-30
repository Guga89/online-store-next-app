import { createSlice } from "@reduxjs/toolkit";

const initialState = { isAuthenticated: false };

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logIn: (state) => {
      state.isAuthenticated = true;
      console.log("Logged In", state.isAuthenticated);
    },
    logOut: (state) => {
      state.isAuthenticated = false;
      console.log("Logged Out!", state.isAuthenticated);
    },
  },
});

// Action creators are generated for each case reducer function
export const { logIn, logOut } = authSlice.actions;

export default authSlice.reducer;
