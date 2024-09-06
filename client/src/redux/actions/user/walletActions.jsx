import { createAsyncThunk } from "@reduxjs/toolkit";
import { appJson } from "../../../Common/configurations";
import { commonReduxRequests } from "../../../Common/api";

export const getWallet = createAsyncThunk(
  "wallet/getWallet",
  async (queries, { rejectWithValue }) => {
    return commonReduxRequests(
      "get",
      `/user/wallet${queries && `?${queries}`}`,
      null,
      appJson,
      rejectWithValue
    );
  }
);
