import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const initialState = Cookies.get('shippingAddress')
  ? JSON.parse(Cookies.get('shippingAddress'))
  : {};

export const addressSlice = createSlice({
  name: 'address',
  initialState,
  reducers: {
    saveShippingAddress: (state, actions) => {
      state = { ...actions.payload };
      Cookies.set('shippingAddress', JSON.stringify(state));
      console.log('shippingAddress', state);
    },
  },
});

// Action creators are generated for each case reducer function
export const { saveShippingAddress } = addressSlice.actions;

export default addressSlice.reducer;
