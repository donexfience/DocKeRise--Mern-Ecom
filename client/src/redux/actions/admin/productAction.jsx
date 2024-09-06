import { createAsyncThunk } from "@reduxjs/toolkit";
import { commonReduxRequests } from "../../../Common/api";
import { appJson, multiForm } from "../../../Common/configurations";
export const createProduct = createAsyncThunk(
  "products/createProduct",
  async (formData, { rejectWithValue }) => {
    return commonReduxRequests(
      "post",
      `/admin/product`,
      formData,
      multiForm,
      rejectWithValue
    );
  }
);

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async (queries, { rejectWithValue }) => {
    return commonReduxRequests(
      "get",
      `/admin/products${queries && `?${queries}`}`,
      null,
      appJson,
      rejectWithValue
    );
  }
);
export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ id, data }, { rejectWithValue }) => {
    return commonReduxRequests(
      "patch",
      `/admin/product/${id}`,
      data,
      multiForm,
      rejectWithValue
    );
  }
);
