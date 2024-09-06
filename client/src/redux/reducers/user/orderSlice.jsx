import { createSlice } from "@reduxjs/toolkit";
import {
  cancelOrder,
  getCouonUsedOrders,
  getOrders,
  getRepaymentorder,
  returnOrder,
} from "../../actions/user/orderAction";
import toast from "react-hot-toast";

const userOrdersSlice = createSlice({
  name: "userOrders",
  initialState: {
    loading: false,
    userOrders: [],
    error: null,
    totalAvailableOrders: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOrders.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.userOrders = payload.orders;
        state.totalAvailableOrders = payload.totalAvailableOrders;
      })
      .addCase(getOrders.rejected, (state, { payload }) => {
        state.loading = false;
        state.userOrders = null;
        state.error = payload;
      })
      .addCase(getCouonUsedOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCouonUsedOrders.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.userOrders = payload.orders;
        state.totalAvailableOrders = payload.totalAvailableOrders;
      })
      .addCase(getCouonUsedOrders.rejected, (state, { payload }) => {
        state.loading = false;
        state.userOrders = null;
        state.error = payload;
      })
      .addCase(cancelOrder.rejected, (state, { payload }) => {
        state.loading = false;
        state.userOrders = null;
        state.error = payload;
      })
      .addCase(cancelOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(cancelOrder.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        const index = state.userOrders.findIndex(
          (item) => item._id === payload.order._id
        );
        if (index !== -1) {
          state.userOrders[index] = payload.order;
        }
        toast.success("Order Cancelled Successfully");
      })
      .addCase(returnOrder.rejected, (state, { payload }) => {
        state.loading = false;
        state.userOrders = null;
        state.error = payload;
      })
      .addCase(returnOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(returnOrder.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        const index = state.userOrders.findIndex(
          (item) => item._id === payload.order._id
        );
        if (index !== -1) {
          state.userOrders[index] = payload.order;
        }
        toast.success("Order return requested Successfully");
      })
      .addCase(getRepaymentorder.pending, (state) => {
        state.loading = true;
      })
      .addCase(getRepaymentorder.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.userOrders = payload.orders;
        state.totalAvailableOrders = payload.totalAvailableOrders;
      })
      .addCase(getRepaymentorder.rejected, (state, { payload }) => {
        state.loading = false;
        state.userOrders = null;
        state.error = payload;
      });
  },
});

export default userOrdersSlice.reducer;
