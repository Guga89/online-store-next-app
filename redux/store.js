import { configureStore } from '@reduxjs/toolkit';
import userAuthReducer from './authSlice';
import cart from './cartSlice';

export const store = configureStore({
  reducer: {
    auth: userAuthReducer,
    cart: cart,
  },
});
