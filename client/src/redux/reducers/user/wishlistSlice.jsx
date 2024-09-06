import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import {
  deleteEntireWishlist,
  deleteOneProduct,
  getWishlist,
} from "../../actions/user/wishlistAction";
import { getCart } from "../../actions/user/cartAction";

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    loading: false,
    wishlist: [],
    error: null,
    wishlistId: "",
  },
  extraReducers: (builder) => {
    builder
      .addCase(getWishlist.pending, (state) => {
        state.loading = true;
      })
      .addCase(getWishlist.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null,
        console.log(payload,"----------wishlist payload=")
         state.wishlist = payload.wishlist?.items || [];

        state.wishlistId = payload.wishlist?._id || "";
      })
      .addCase(getWishlist.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
        state.wishlist = null;
      })
      .addCase(deleteEntireWishlist.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.wishlist = [];
        toast.success("wishlist fully cleared");
      })
      .addCase(deleteEntireWishlist.rejected, (state, { payload }) => {
        state.loading = false;
        state.wishlist = null;
        state.error = payload;
      })
      .addCase(deleteEntireWishlist.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(deleteOneProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteOneProduct.rejected, (state, { payload }) => {
        state.loading = false;
        state.wishlist = null;
        state.error = payload;
      })
      .addCase(deleteOneProduct.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        const { productId } = payload;
        console.log("product-delete", productId);
        state.wishlist = state.wishlist.filter((item) => {
          return item.product._id !== productId;
        });
        toast.success("Item deleted successfully");
      });
  },
});

export default wishlistSlice.reducer;