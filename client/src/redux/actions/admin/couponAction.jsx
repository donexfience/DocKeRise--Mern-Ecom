import { createAsyncThunk } from "@reduxjs/toolkit";
import { commonReduxRequests } from "../../../Common/api";
import { appJson } from "../../../Common/configurations";
import axios from "axios";

// creating new coupon
export const createCoupon = createAsyncThunk(
  "coupons/createCoupon",
  async (formData, { rejectwithValue }) => {
    return commonReduxRequests(
      "post",
      "admin/coupons",
      formData,
      appJson,
      rejectwithValue
    );
  }
);

// editing the coupon
export const editCoupon = createAsyncThunk(
  "coupons/editCoupon",
  async ({ id, formData }, { rejectwithValue }) => {
    console.log(formData,'ppppppppppp')
    return commonReduxRequests(
      "patch",
      `/admin/coupon/${id}`,
      formData,
      appJson,
      rejectwithValue
    );
  }
);
export const getCoupons = createAsyncThunk(
  "coupons/getCoupons",
  async (queries, { rejectwithValue }) => {
    return commonReduxRequests(
      "get",
      `admin/coupons${queries && `?${queries}`}`,
      null,
      appJson,
      rejectwithValue
    );
  }
);
