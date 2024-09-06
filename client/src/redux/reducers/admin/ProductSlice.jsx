import { createSlice } from "@reduxjs/toolkit";
import { createProduct, getProducts, updateProduct } from "../../actions/admin/productAction";

const produceSlice = createSlice({
  name: "products",
  initialState: {
    loading: false,
    products: [],
    error: null,
    totalAvailableProducts: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.loading - true;
      })
      .addCase(getProducts.rejected, (state, { payload }) => {
        state.loading = false;
        state.products = null;
        state.error = payload;
      })
      .addCase(getProducts.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.products = payload.products;
        state.totalAvailableProducts = payload.totalAvailableProducts;
      })

      //createing

      // Creating new Product
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(createProduct.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.products = [...state.products, payload];
      })
      .addCase(createProduct.rejected, (state, { payload }) => {
        state.loading = false;
        state.products = null;
        state.error = payload;
        state.totalAvailableProducts = state.totalAvailableProducts + 1;
      })

      //update
      .addCase(updateProduct.rejected, (state, { payload }) => {
        state.loading = false;
        state.products = null;
        state.error = payload;
      })
      .addCase(updateProduct.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        const index = state.products.findIndex(
          (product) => product._id === payload._id
        );
        if (index !== 1) {
          state.products[index] = payload;
        }
      }).addCase(updateProduct.pending,(state,{payload})=>{
        state.loading=false;
        state.error=payload
        state.products=null;

      })  },
});

export default produceSlice.reducer
