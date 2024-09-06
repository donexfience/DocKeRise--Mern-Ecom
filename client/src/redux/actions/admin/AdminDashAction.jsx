import { createAsyncThunk } from "@reduxjs/toolkit";
import { commonReduxRequests } from "../../../Common/api";
import { appJson } from "../../../Common/configurations";

export const getBestSellingProducts = createAsyncThunk(
  "adminDash/getBestSellingProducts",
  async (q, { rejectWithValue }) => {
    return commonReduxRequests(
      "get",
      `/admin/BestSellingProducts`,
      null,
      appJson,
      rejectWithValue
    );
  }
);

export const getBestSellingCategory = createAsyncThunk(
  "adminDash/getBestSellingCategory",
  async (q, { rejectWithValue }) => {
    return commonReduxRequests(
      "get",
      `/admin/BestSellingCategory`,
      null,
      appJson,
      rejectWithValue
    );
  }
);
