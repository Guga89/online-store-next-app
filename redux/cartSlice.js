import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const initialState = {
  cartItems: Cookies.get('cartItems')
    ? JSON.parse(Cookies.get('cartItems'))
    : [],
  priceSum: Cookies.get('priceSum')
    ? Number(JSON.parse(Cookies.get('priceSum')))
    : 0,
  shippingAddress: Cookies.get('shippingAddress')
    ? JSON.parse(Cookies.get('shippingAddress'))
    : {},
  paymentMethod: Cookies.get('paymentMethod')
    ? JSON.parse(Cookies.get('paymentMethod'))
    : '',
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    //========================= CART ADD ITEM =========================
    cartAddItem: (state, actions) => {
      const updatedPriceSum = state.priceSum + actions.payload.price;
      const newItem = actions.payload;
      const existingItemIndex = state.cartItems.findIndex(
        (item) => item._id === newItem._id
      );
      const existItem = state.cartItems[existingItemIndex];

      let updatedItem;
      let updatedCartItems;

      if (existItem) {
        updatedItem = { ...existItem, quantity: existItem.quantity + 1 };
        updatedCartItems = [...state.cartItems];
        updatedCartItems[existingItemIndex] = updatedItem;
      } else {
        updatedCartItems = state.cartItems.concat({
          ...actions.payload,
          quantity: 1,
        });
      }

      Cookies.set('cartItems', JSON.stringify(updatedCartItems));
      Cookies.set('priceSum', JSON.stringify(updatedPriceSum));

      state.cartItems = updatedCartItems;
      state.priceSum = updatedPriceSum;
    },
    // =========================CART REDUCE ITEM COUNT ==========================
    cartReduceItemCount: (state, actions) => {
      const updatedPriceSum = state.priceSum - actions.payload.price;

      const reducedItem = actions.payload;

      const existingItemIndex = state.cartItems.findIndex(
        (item) => item._id === reducedItem._id
      );
      const existItem = state.cartItems[existingItemIndex];

      let updatedItem;
      let updatedCartItems;

      if (existItem.quantity === 1) {
        updatedCartItems = state.cartItems.filter((item) => {
          return actions.payload._id !== item._id;
        });
      } else {
        updatedItem = { ...existItem, quantity: existItem.quantity - 1 };
        updatedCartItems = [...state.cartItems];
        updatedCartItems[existingItemIndex] = updatedItem;
      }
      Cookies.set('cartItems', JSON.stringify(updatedCartItems));
      Cookies.set('priceSum', JSON.stringify(updatedPriceSum));

      state.cartItems = updatedCartItems;
      state.priceSum = updatedPriceSum;
    },
    // =========================CART REMOVE ITEM ==========================
    cartRemoveItem: (state, actions) => {
      const updatedPriceSum =
        state.priceSum - actions.payload.price * actions.payload.quantity;

      let updatedCartItems;

      updatedCartItems = state.cartItems.filter((item) => {
        return actions.payload._id !== item._id;
      });

      Cookies.set('cartItems', JSON.stringify(updatedCartItems));
      Cookies.set('priceSum', JSON.stringify(updatedPriceSum));

      state.cartItems = updatedCartItems;
      state.priceSum = updatedPriceSum;
      console.log('Removed from cart!');
    },

    //==========================CLEAR ENTIRE CART ================================
    clearAll: (state) => {
      Cookies.set('cartItems', JSON.stringify([]));
      Cookies.set('priceSum', JSON.stringify(0));
      Cookies.set('shippingAddress', JSON.stringify({}));
      Cookies.set('paymentMethod', JSON.stringify(''));
      state.cartItems = [];
      state.priceSum = 0;
      // state.shippingAddress = {};
      // state.paymentMethod = '';
    },

    //==============================ADDING SHIPPING ADDRESS and PAYMENT===========================
    saveShippingAddress: (state, actions) => {
      state.shippingAddress = { ...actions.payload };
      Cookies.set('shippingAddress', JSON.stringify(state.shippingAddress));
      // console.log('shippingAddress', state.shippingAddress);
    },
    savePaymentMethod: (state, actions) => {
      state.paymentMethod = actions.payload;
      Cookies.set('paymentMethod', JSON.stringify(state.paymentMethod));
      // console.log('shippingAddress', state.shippingAddress);
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  cartAddItem,
  cartRemoveItem,
  cartReduceItemCount,
  clearAll,
  saveShippingAddress,
  savePaymentMethod,
} = cartSlice.actions;

export default cartSlice.reducer;
