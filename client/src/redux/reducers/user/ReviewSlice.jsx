import { createSlice } from "@reduxjs/toolkit";
import { createReview, getReviews, updateReview } from "../../actions/user/uesrReviewAction";

const ReviewSlice = createSlice({
  name: "reviews",
  initialState: {
    loading: false,
    reviews: [],
    error: null,
  },
  extraReducers: (buiilder) => {
    buiilder
      .addCase(getReviews.pending, (state) => {
        state.loading = true;
      })
      .addCase(getReviews.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.reviews = payload;
      })
      .addCase(getReviews.rejected, (state, { payload }) => {
        state.loading = false;
        state.reviews = null;
        state.error = payload;
      })
      .addCase(updateReview.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateReview.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        const index = state.reviews.findIndex(
          (item) => item._id === payload.review._id
        );

        if (index !== -1) {
          state.reviews[index] = payload.review;
        }
        toast.success("Review Updated");
      })
      .addCase(updateReview.rejected, (state, { payload }) => {
        state.loading = false;
        state.reviews = null;
        state.error = payload;
      })
      .addCase(createReview.pending, (state) => {
        state.loading = true;
      })
      .addCase(createReview.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.reviews = [...state.reviews, payload.review];
        toast.success("Review Added");
      })
      .addCase(createReview.rejected, (state, { payload }) => {
        state.loading = false;
        state.reviews = null;
        state.error = payload;
      });
  },
});
export default ReviewSlice.reducer;
