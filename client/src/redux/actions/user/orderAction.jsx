import { createAsyncThunk } from "@reduxjs/toolkit";
import { commonReduxRequests } from "../../../Common/api";
import { appJson } from "../../../Common/configurations";

export const getOrders = createAsyncThunk(
  "order/getOrders",
  async (queries, { rejectWithValue }) => {
    return commonReduxRequests(
      "get",
      `/user/orders${queries && `?${queries}`}`,
      null,
      appJson,
      rejectWithValue
    );
  }
);
export const getCouonUsedOrders = createAsyncThunk(
  "order/getCouponUsedOrders",
  async (queries, { rejectWithValue }) => {
    return commonReduxRequests(
      "get",
      `/user/getCouponOrders${queries && `?${queries}`}`,
      null,
      appJson,
      rejectWithValue
    );
  }
);
export const cancelOrder = createAsyncThunk(
  "order/cancelOrder",
  async ({ id, formData }, { rejectWithValue }) => {
    return commonReduxRequests(
      "post",
      `user/cancel-order/${id}`,
      formData,
      appJson,
      rejectWithValue
    );
  }
);

export const returnOrder = createAsyncThunk(
  "order/returnOrder",
  async ({ id, formData }, { rejectWithValue }) => {
    return commonReduxRequests(
      "post",
      `user/return-order/${id}`,
      formData,
      appJson,
      rejectWithValue
    );
  }
);

export const getRepaymentorder = createAsyncThunk(
  "/order/getRepaymentorder",
  async (id, { rejectWithValue }) => {
    return commonReduxRequests(
      "get",
      `user/RepaymentOrder/${id}`,
      null,
      rejectWithValue
    );
  }
);
