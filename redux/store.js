import { configureStore } from "@reduxjs/toolkit";
import userAuthReducer from "./authSlice";

export const store = configureStore({
  reducer: {
    auth: userAuthReducer,
  },
});
