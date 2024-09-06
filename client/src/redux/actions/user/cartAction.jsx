import { createAsyncThunk } from "@reduxjs/toolkit";
import { commonReduxRequests } from "../../../Common/api";
import { appJson } from "../../../Common/configurations";

//getting cart at initial loading

export const getCart = createAsyncThunk(
  "cart/getCart",
  async (req, { rejectWithValue }) => {
    return commonReduxRequests(
      "get",
      "/user/cart",
      {},
      appJson,
      rejectWithValue
    );
  }
);

// deleting the entire cart

export const deleteEntireCart = createAsyncThunk(
  "cart/deleteEntireCart",
  async (id, { rejectWithValue }) => {
    return commonReduxRequests(
      "delete",
      `user/cart/${id}`,
      {},
      appJson,
      rejectWithValue
    );
  }
);

//deleting one item from the cart

export const deleteOneProduct = createAsyncThunk(
  "cart/deleteOneProduct",
  async ({ cartId, productId }, { rejectWithValue }) => {
    return commonReduxRequests(
      "delete",
      `/user/cart/${cartId}/item/${productId}`,
      {},
      appJson,
      rejectWithValue
    );
  }
);

//incrementing quantity one by one

export const incrementCount = createAsyncThunk(
  "cart/incrementCount",
  async ({ cartId, productId }, { rejectWithValue }) => {
    return commonReduxRequests(
      "patch",
      `/user/cart-increment-quantity/${cartId}/item/${productId}`,
      {},
      appJson,
      rejectWithValue
    );
  }
);

//decrementing quantity one by one

export const decrementCount = createAsyncThunk(
  "cart/decrementCount",
  async ({ cartId, productId }, { rejectWithValue }) => {
    return commonReduxRequests(
      "patch",
      `/user/cart-decrement-quantity/${cartId}/item/${productId}`,
      {},
      appJson,
      rejectWithValue
    );
  }
);
//remove coupons

export const removeCoupon = createAsyncThunk(
  "cart/removeCoupon",
  async (req, { rejectWithValue }) => {
    return commonReduxRequests(
      "get",
      "/user/coupon-remove",
      {},
      appJson,
      rejectWithValue
    );
  }
);
//apply coupon
export const applyCoupon = createAsyncThunk(
  "cart/applyCoupon",
  async (couponCode, { rejectWithValue }) => {
    return commonReduxRequests(
      "post",
      `/user/coupon-apply`,
      { code: couponCode },
      appJson,
      rejectWithValue
    );
  }
);

export const CheckProductAvailable = createAsyncThunk(
  "/cart/productAvailabile",
  async (cartId, { rejectWithValue }) => {
    console.log(cartId, "9999999");
    return commonReduxRequests(
      "post",
      `/user/productAvailabile`,
      { cartId },
      appJson,
      rejectWithValue
    );
  }
);

export const CheckCouponAvailable = createAsyncThunk(
  "/cart/couponAvailable",
  async ({cartId,couponCode}, { rejectWithValue }) => {
    console.log(cartId,"coupon availabbbbbbbbbble")
    return commonReduxRequests(
      "post",
      "/user/couponAvailable",
      { cartId,couponCode },
      appJson,
      rejectWithValue
    );
  }
);
