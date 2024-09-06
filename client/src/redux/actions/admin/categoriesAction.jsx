import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { URL } from "../../../Common/api";
import {
  appJson,
  config,
  configMultiPart,
  handleError,
} from "../../../Common/configurations";
import toast from "react-hot-toast";

export const createNewCategory = createAsyncThunk(
  "categories/createNewCategory",
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${URL}/admin/category`,
        formData,
        configMultiPart
      );
      return data;
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.error);
      return handleError(error, rejectWithValue);
    }
  }
);

export const createNewOffer = createAsyncThunk(
  "admin/categories/createNewOffer",
  async (formData, { rejectWithValue }) => {
    console.log(formData);
    try {
      const { data } = await axios.post(
        `${URL}/admin/category/offer`,
        formData,
        appJson
      );
      return data;
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.error);
      return handleError(error, rejectWithValue);
    }
  }
);

export const getCategories = createAsyncThunk(
  "categories/getCategories",
  async (queries, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${URL}/admin/categories?${queries}`);
      return data;
      console.log(data);
    } catch (error) {
      return handleError(error, rejectWithValue);
    }
  }
);
export const updateCategory = createAsyncThunk(
  "categories/updateCategory",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const { data } = await axios.patch(
        `${URL}/admin/category/${id}`,
        formData,
        configMultiPart
      );
      return data;
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.error);
      return handleError(error, rejectWithValue);
    }
  }
);
export const deleteCategory = createAsyncThunk(
  "categories/deleteCategory",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(
        `${URL}/admin/category/${id}`,
        config
      );
      return data;
    } catch (error) {
      return handleError(error, rejectWithValue);
    }
  }
);
