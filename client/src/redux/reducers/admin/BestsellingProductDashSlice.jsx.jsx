import { createSlice } from "@reduxjs/toolkit";
import { getBestSellingProducts } from "../../actions/admin/AdminDashAction";

const BestsellingProductDashSlice = createSlice({
  name: "BestsellingProductDash",
  initialState: {
    loading: false,
    BestsellingProduct: [],
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBestSellingProducts.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.BestsellingProduct = payload;
        state.error = null;
      })
      .addCase(getBestSellingProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getBestSellingProducts.rejected, (state, { payload }) => {
        state.error = payload;
        state.BestsellingProduct = null;
        state.loading = false;
      });
  },
});

export default BestsellingProductDashSlice.reducer;
