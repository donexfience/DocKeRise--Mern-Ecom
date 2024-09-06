import { createAsyncThunk } from "@reduxjs/toolkit";
import { commonReduxRequests } from "../../../Common/api";
import { appJson } from "../../../Common/configurations";

export const getWishlist = createAsyncThunk(
  "wishlist/getWishlist",
  async (req, { rejectwithValue }) => {
    return commonReduxRequests(
      "get",
      "user/wishlist",
      {},
      appJson,
      rejectwithValue
    );
  }
);

export const deleteEntireWishlist = createAsyncThunk(
  "cart/deleteEntireWishlist",
  async (id, { rejectWithValue }) => {
    return commonReduxRequests(
      "delete",
      `user/wishlist/${id}`,
      {},
      appJson,
      rejectWithValue
    );
  }
);

//deleting one item from the cart

export const deleteOneProduct = createAsyncThunk(
  "cart/deleteOneProduct",
  async ({ wishlistId, productId }, { rejectWithValue }) => {
    return commonReduxRequests(
      "delete",
      `/user/wishlist/${wishlistId}/item/${productId}`,
      {},
      appJson,
      rejectWithValue
    );
  }
);
