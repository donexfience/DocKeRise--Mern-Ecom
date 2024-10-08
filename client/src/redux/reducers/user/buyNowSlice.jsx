import { createSlice } from "@reduxjs/toolkit";
const buyNowSlice = createSlice({
  name: "buyNow",
  initialState: {
    loading: false,
    product: null,
    quantity: null,
    error: null,
  },
  reducers: {
    addToBuyNowStore: (state, { payload }) => {
      state.product = payload.product;
      state.quantity = payload.count;
    },
    eraseBuyNowStore: (state) => {
      state.product = null;
      state.quantity = null;
    },
  },
});

export const { addToBuyNowStore, eraseBuyNowStore } = buyNowSlice.actions;
export default buyNowSlice.reducer;
