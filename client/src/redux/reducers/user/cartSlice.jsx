import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import {
  CheckCouponAvailable,
  CheckProductAvailable,
  applyCoupon,
  decrementCount,
  deleteEntireCart,
  deleteOneProduct,
  getCart,
  incrementCount,
  removeCoupon,
} from "../../actions/user/cartAction";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    loading: false,
    cart: [],
    error: null,
    cartId: "",
    countLoading: false,
    totalPrice: 0,
    tax: 0,
    shipping: 0,
    discount: 0,
    couponType: "",
    couponCode: "",
    unAvailableProducts: [],
    couponValid: true,
  },
  reducers: {
    calculateTotalPrice: (state) => {
      let sum = state.cart.reduce((total, item) => {
        let priceWithMarkup = item.product.price + item.product.markup;
        let offerPrice = priceWithMarkup * (item.product.offer / 100);
        let totalPrice = priceWithMarkup - offerPrice;
        return total + totalPrice * item.quantity;
      }, 0);
      sum = Math.round(sum);
      console.log(sum, "cart slice");

      state.shipping = 40;
      state.tax = Math.round(sum * 0.08);
      state.totalPrice = sum + state.shipping + state.tax;
    },
    clearCartOnOrderPlaced: (state) => {
      state.loading = false;
      state.error = null;
      state.cart = [];
      state.cartId = "";
      state.totalPrice = 0;
      state.tax = 0;
      state.shipping = 0;
      (state.couponCode = ""), (state.couponType = ""), (state.discount = 0);
    },
    setCart: (state, action) => {
      state.cart = action.payload;
    },
    clearUnavailbleProducts: (state) => {
      state.unAvailableProducts = [];
    },
    setCouponValid: (state, action) => {
      state.couponValid = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCart.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.cart = payload.cart?.items || [];
        state.cartId = payload.cart?._id || "";
        state.couponType = payload.cart?.type || "";
        state.couponCode = payload.cart?.couponCode || "";
        state.discount = payload.cart?.discount || "";
      })
      .addCase(getCart.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
        state.cart = null;
      })
      .addCase(deleteEntireCart.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.cart = [];
        toast.success("cart fully cleared");
      })
      .addCase(deleteEntireCart.rejected, (state, { payload }) => {
        state.loading = false;
        state.cart = null;
        state.error = payload;
      })
      .addCase(deleteEntireCart.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(deleteOneProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteOneProduct.rejected, (state, { payload }) => {
        state.loading = false;
        state.cart = null;
        state.error = payload;
      })
      .addCase(deleteOneProduct.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        const { productId } = payload;
        console.log("product-delete", productId);
        state.cart = state.cart.filter((item) => {
          return item.product._id !== productId;
        });
        toast.success("Item deleted successfully");
      })
      .addCase(incrementCount.rejected, (state, { payload }) => {
        state.countLoading = false;
        state.error = payload;
        toast.error(payload);
      })
      .addCase(incrementCount.pending, (state) => {
        state.countLoading = true;
      })
      .addCase(incrementCount.fulfilled, (state, { payload }) => {
        state.countLoading = false;
        state.error = null;
        const updatedCart = state.cart.map((cartItem) => {
          if (cartItem.product._id === payload.updatedItem.product) {
            return {
              ...cartItem,
              quantity: cartItem.quantity + 1,
            };
          }
          return cartItem;
        });
        state.cart = updatedCart;
      })
      .addCase(decrementCount.rejected, (state, { payload }) => {
        state.countLoading = false;
        state.error = payload;
        toast.error(payload);
      })
      .addCase(decrementCount.pending, (state) => {
        state.countLoading = true;
      })
      .addCase(decrementCount.fulfilled, (state, { payload }) => {
        state.countLoading = false;
        state.error = null;
        const updatedCart = state.cart.map((cartItem) => {
          if (cartItem.product._id === payload.updatedItem.product) {
            return {
              ...cartItem,
              quantity: cartItem.quantity - 1,
            };
          }
          return cartItem;
        });
        state.cart = updatedCart;
      })

      // coupon management is redux

      .addCase(applyCoupon.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
        toast.error(payload);
      })
      .addCase(applyCoupon.pending, (state) => {
        state.loading = true;
      })
      .addCase(applyCoupon.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.discount = payload.discount;
        state.couponType = payload.couponType;
        state.couponCode = payload.couponCode;
        toast.success("Coupon Applied");
      })
      // Removing coupon
      .addCase(removeCoupon.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeCoupon.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.discount = 0;
        state.couponType = "";
        state.couponCode = "";
        toast.success("Coupon Removed");
      })
      .addCase(removeCoupon.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(CheckProductAvailable.pending, (state) => {
        state.loading = true;
      })
      .addCase(CheckProductAvailable.fulfilled, (state, action) => {
        state.loading = false;
        state.unAvailableProducts = action.payload.unAvailableProducts || [];
      })
      .addCase(CheckProductAvailable.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(CheckCouponAvailable.pending, (state) => {
        state.loading = true;
      })
      .addCase(CheckCouponAvailable.fulfilled, (state, action) => {
        state.loading = false;
        state.couponValid = action.payload.valid;
      })
      .addCase(CheckCouponAvailable.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.couponValid = false;
      });
  },
});
export default cartSlice.reducer;
export const {
  calculateTotalPrice,
  clearCartOnOrderPlaced,
  setCart,
  clearUnavailbleProducts,
  setCouponValid,
} = cartSlice.actions;
