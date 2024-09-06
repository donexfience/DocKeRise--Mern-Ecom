import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/user/userSlice";
import categoriesReducer from "./reducers/admin/categoriesSlice";
import productReducer from "./reducers/admin/ProductSlice";
import customerReducer from "./reducers/admin/customerSlice";
import userProductReducer from "./reducers/user/userProductSlice";
import cartReducer from "./reducers/user/cartSlice";
import addressReducer from "./reducers/user/addressSlice";
import userOrderReducer from "./reducers/user/orderSlice";
import reviewReducer from "./reducers/user/ReviewSlice";
import orderReducer from "./reducers/admin/ordersSlice";
import couponReducer from "./reducers/admin/couponSlice";
import wishlistReducer from "./reducers/user/wishlistSlice";
import walletReducer from "./reducers/user/walletSlice";
import BestsellingProductReducer from "./reducers/admin/BestsellingProductDashSlice.jsx";
import BestsellingCategoryReducer from "./reducers/admin/BestsellingCategoryDashslice.jsx";
export const store = configureStore({
  reducer: {
    user: userReducer,

    //user side reducers in store
    userProducts: userProductReducer,
    cart: cartReducer,
    address: addressReducer,
    userOrders: userOrderReducer,
    reviews: reviewReducer,
    wishlist: wishlistReducer,
    wallet: walletReducer,

    //Admin side reducers in store

    categories: categoriesReducer,
    products: productReducer,
    customer: customerReducer,
    orders: orderReducer,
    coupons: couponReducer,
    BestsellingProduct: BestsellingProductReducer,
    BestsellingCategory: BestsellingCategoryReducer,
  },
});
