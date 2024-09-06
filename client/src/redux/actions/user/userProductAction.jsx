import { createAsyncThunk } from "@reduxjs/toolkit";
import { commonReduxRequests } from "../../../Common/api";
import { appJson } from "../../../Common/configurations";
export const getUserProducts = createAsyncThunk(
  "products/getUserProducts",
  async (searchParams, { rejectWithValue }) => {
    return commonReduxRequests(
      "get",
      `/user/product?${searchParams}`,
      null,
      appJson,
      rejectWithValue
    );
  }
);
