import { createAsyncThunk } from "@reduxjs/toolkit";
import { commonReduxRequests } from "../../../Common/api";
import { appJson } from "../../../Common/configurations";

export const createAddress = createAsyncThunk(
  "address/createAddress",
  async (formData, { rejectWithValue }) => {
    return commonReduxRequests(
      "post",
      `/user/address`,
      formData,
      appJson,
      rejectWithValue
    );
  }
);

export const getAddresses = createAsyncThunk(
  "address/getAddresses",
  async (_, { rejectWithValue }) => {
    return commonReduxRequests(
      "get",
      `/user/address`,
      null,
      appJson,
      rejectWithValue
    );
  }
);

export const deleteAddress = createAsyncThunk(
  "address/deleteAddress",
  async (id, { rejectWithValue }) => {
    return commonReduxRequests(
      "delete",
      `/user/address/${id}`,
      {},
      appJson,
      rejectWithValue
    );
  }
);

export const updateAddress = createAsyncThunk(
  "address/updateAddress",
  async ({ id, formData }, { rejectWithValue }) => {
    return commonReduxRequests(
      "patch",
      `/user/address/${id}`,
      formData,
      appJson,      
      rejectWithValue
    );
  }
);
