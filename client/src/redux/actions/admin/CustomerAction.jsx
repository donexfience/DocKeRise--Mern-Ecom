import { createAsyncThunk } from "@reduxjs/toolkit";
import { commonReduxRequests } from "../../../Common/api";
import { appJson, multiForm } from "../../../Common/configurations";


// Function to Create new Customer
export const createNewCustomer = createAsyncThunk(
  "customers/createNewCustomer",
  async (formData, { rejectWithValue }) => {
    return commonReduxRequests(
      "post",
      `/admin/customer`,
      formData,
      multiForm,
      rejectWithValue
    );
  }
);

export const getCustomers = createAsyncThunk(
  "customers/getCustomers",
  async (queries, { rejectWithValue }) => {
    console.log("inside the getcustomer action")
    return commonReduxRequests(
      "get",
      `/admin/customers${queries && `?${queries}`}`,
      null,
      appJson,
      rejectWithValue
    );
  }
);

export const blockOrUnBlock = createAsyncThunk(
  "customers/blockOrUnBlock",
  async ({ id, isActive }, { rejectWithValue }) => {
    return commonReduxRequests(
      "patch",
      `/admin/customer-block-unblock/${id}`,
      { isActive },
      appJson,
      rejectWithValue
    );
  }
);
