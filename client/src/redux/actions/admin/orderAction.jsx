import { createAsyncThunk } from "@reduxjs/toolkit";
import { commonReduxRequests } from "../../../Common/api";
import { appJson } from "../../../Common/configurations";

// updaing orders from table
export const updateOrderStatus = createAsyncThunk(
  "orders/updateOrderStatus",
  async ({ id, formData }, { rejectWithValue }) => {
    return commonReduxRequests(
      "patch",
      `/admin/order-status/${id}`,
      formData,
      appJson,
      rejectWithValue
    );
  }
);
// geetting all user data at first load on admin side table
export const getOrders = createAsyncThunk(
  "orders/getOrders",
  async (queries, { rejectWithValue }) => {
    console.log(queries,"-----")
    return commonReduxRequests(
      "get",
      `/admin/orders${queries && `?${queries}`}`,
      null,
      appJson,
      rejectWithValue
    );
  }
);
export const getReturnOrders = createAsyncThunk(
  "orders/getReturnOrders",
  async (queries, { rejectWithValue }) => {
    console.log(queries,"!!!!!!!!!")
    return commonReduxRequests(
      "get",
      `/admin/return-orders${queries && `?${queries}`}`,
      null,
      appJson,
      rejectWithValue
    );
  }
);
export const updateOrderReturnStatus = createAsyncThunk(
  "orders/updateOrderReturnStatus",
  async ({ id, formData }, { rejectWithValue }) => {
    return commonReduxRequests(
      "patch",
      `/admin/order-return-status/${id}`,
      formData,
      appJson,
      rejectWithValue
    );
  }
);
