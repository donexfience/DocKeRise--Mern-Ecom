import { createAsyncThunk } from "@reduxjs/toolkit";
import { appJson } from "../../../Common/configurations";
import { commonReduxRequests } from "../../../Common/api";

export const createReview = createAsyncThunk(
  "reviews/createReview",
  async (formData, { rejectWithValue }) => {
    return commonReduxRequests(
      "post",
      `/user/review`,
      formData,
      appJson,
      rejectWithValue
    );
  }
);

export const getReviews = createAsyncThunk(
  "reviews/getReviews",
  async (id, { rejectWithValue }) => {
    return commonReduxRequests(
      "get",
      `/user/order-review/${id}`,
      {},
      appJson,
      rejectWithValue
    );
  }
);

export const updateReview = createAsyncThunk(
  "reviews/updateReview",
  async ({ id, formData }, { rejectWithValue }) => {
    return commonReduxRequests(
      "patch",
      `/user/review/${id}`,
      formData,
      appJson,
      rejectWithValue
    );
  }
);
