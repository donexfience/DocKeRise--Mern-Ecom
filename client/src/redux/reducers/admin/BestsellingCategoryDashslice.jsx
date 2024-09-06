import { createSlice } from "@reduxjs/toolkit";
import { getBestSellingCategory } from "../../actions/admin/AdminDashAction";

const BestsellingCategoryDashSlice = createSlice({
  name: "BestsellingCategoryDash",
  initialState: {
    loading: false,
    BestsellingCategory: [],
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBestSellingCategory.fulfilled, (state, { payload }) => {
        state.loading = true;
        state.BestsellingCategory = payload;
        state.error = null;
      })
      .addCase(getBestSellingCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(getBestSellingCategory.rejected, (state, { payload }) => {
        state.error = payload;
        state.BestsellingCategory = null;
        state.loading = false;
      });
  },
});

export default BestsellingCategoryDashSlice.reducer;
