import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const initialState = Cookies.get('userInfo')
  ? JSON.parse(Cookies.get('userInfo'))
  : { isAuthenticated: false };

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logIn: (state, actions) => {
      state.isAuthenticated = true;
      state.name = actions.payload.name;
      state.token = actions.payload.token;
      state = { ...state, ...actions.payload };
      Cookies.set('userInfo', JSON.stringify(state));
      console.log('Logged In', state);
    },
    logOut: (state) => {
      state.isAuthenticated = false;
      state = { isAuthenticated: false };
      Cookies.set('userInfo', JSON.stringify({}));
      Cookies.set('cartItems', JSON.stringify([]));
      Cookies.set('shippingAddress', JSON.stringify({}));
      Cookies.set('paymentMethod', JSON.stringify(''));
      Cookies.set('priceSum', JSON.stringify(0));
      console.log('Logged Out!', state);
    },
  },
});

// Action creators are generated for each case reducer function
export const { logIn, logOut } = authSlice.actions;

export default authSlice.reducer;
