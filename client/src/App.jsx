import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { getUserDataFirst } from "./redux/actions/userActions";
import { Toaster } from "react-hot-toast";
import Home from "./pages/public/Home";
import Signup from "./pages/auth/Signup";
import Login from "./pages/auth/Login";
import ValidateOTP from "./pages/auth/ValidateOTP";
import ForgetPassword from "./pages/auth/ForgetPassword";
import Contact from "./pages/public/Contact";
import About from "./pages/public/About";
import Footer from "./components/Footer";
import Dashboard from "./pages/Dashboard";
import AdminHome from "./pages/admin/pages/AdminHome";
import AdminDash from "./pages/admin/Dashboard";
import SIdeNavbar from "./pages/admin/components/SIdeNavbar";
import CreateCategory from "./pages/admin/pages/categories/CreateCategory";
import Categories from "./pages/admin/pages/categories/Categories";
import EditCategory from "./pages/admin/pages/categories/EditCategory";
import AddProducts from "./pages/admin/pages/products/AddProducts";
import Products from "./pages/admin/pages/products/Products";
import EditProduct from "./pages/admin/pages/products/EditProduct";
import Customers from "./pages/admin/pages/customers/Customers";
import ProductDetails from "./pages/user/pages/ProductDetails";
import Cart from "./pages/user/cart/Cart";
import Checkout from "./pages/user/checkout/Checkout";
import OrderConfirmation from "./pages/user/order/OrderConfirmation";
import ProfileDashboard from "./pages/user/profileDashboard/ProfileDashboard";
import Dash from "./pages/user/profileDashboard/Dash";
import OrderHistory from "./pages/user/profileDashboard/OrderHistory";
import OrderDetail from "./pages/user/profileDashboard/OrderDetail";
import ProfilePage from "./pages/user/profileDashboard/ProfilePage";
import Orders from "./pages/admin/pages/orders/Orders";
import OrderDetailAdmin from "./pages/admin/pages/orders/OrderDetailAdmin";
import Address from "./pages/user/profileDashboard/Address/Address";
import CreateCoupon from "./pages/admin/pages/coupon/CreateCoupon";
import Coupons from "./pages/admin/pages/coupon/Coupons";
import EditCoupon from "./pages/admin/pages/coupon/EditCoupon";
import Wishlist from "./pages/user/wishlist/Wishlist";
import FindCoupon from "./pages/user/profileDashboard/Coupon/FindCoupon";
import ReturnOrder from "./pages/admin/pages/orders/ReturnOrder";
import CreateOffer from "./pages/admin/pages/categories/CreateOffer";
import SearchCoupons from "./pages/user/profileDashboard/Coupon/SearchCoupons";
import Wallet from "./pages/user/profileDashboard/wallet/Wallet";
import ReCheckout from "./pages/user/checkout/Recheckout";
import Error from "./pages/404/Error";

function App() {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      dispatch(getUserDataFirst());
    }
  }, [dispatch, user]);
  const ProtectedRoute = ({ element }) => {
    const { user } = useSelector((state) => state.user);
    return user ? element : <Navigate to="/login" />;
  };
  return (
    //user routes
    <>
      <Toaster position="top-center" />
      <BrowserRouter>
        {user ? user.role === "user" && <Navbar /> : <Navbar />}

        <Routes>
          <Route
            path="/"
            element={
              user ? (
                user.role === "admin" || user.role === "superAdmin" ? (
                  <Navigate to="/admin" />
                ) : (
                  <Dashboard />
                )
              ) : (
                <Home />
              )
            }
          />
          {/* user routes */}

          {/* cart */}
          <Route path="/cart" element={<ProtectedRoute element={<Cart />} />} />
          {/* product details */}
          <Route path="/product/:id" element={<ProductDetails />} />
          {/* checkout */}

          <Route
            path="/checkout"
            element={<ProtectedRoute element={<Checkout />} />}
          />

          {/* order confirmation */}
          <Route
            path="/order-confirmation"
            element={<ProtectedRoute element={<OrderConfirmation />} />}
          />
          {/* wishlist */}

          <Route
            path="/wishlist"
            element={<ProtectedRoute element={<Wishlist />} />}
          />

          {/* Admin Routes */}
          {(user && user.role === "admin") ||
          (user && user.role === "superAdmin") ? (
            <Route path="/admin/*" element={<AdminRoutes />} />
          ) : (
            <Route path="/admin" element={<Navigate to="/" />} />
          )}
          {/* auth routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/otp" element={<ValidateOTP />} />
          <Route path="/forgot-password" element={<ForgetPassword />} />

          {/* home components routes */}
          {/* <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} /> */}
          
          {/* user profile mangement */}

          <Route
            path="/dashboard"
            element={<ProtectedRoute element={<ProfileDashboard />} />}
          >
            {/* user Profile options */}
            <Route index element={<Dash />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="order-history" element={<OrderHistory />} />
            <Route path="order-history/detail/:id" element={<OrderDetail />} />
            <Route
              path="order-history/detail/:id/repayment"
              element={<ReCheckout />}
            />
            <Route path="address" element={<Address />} />
            <Route path="wishlist" element={<Wishlist />} />
            <Route path="coupons" element={<FindCoupon />} />
            <Route path="coupons-search" element={<SearchCoupons />} />
            <Route path="wallet" element={<Wallet />} />
          </Route>

          {/* 404 page */}
          <Route path="*" Component={Error} />
        </Routes>
        {user ? user.role === "user" && <Footer /> : <Footer />}
      </BrowserRouter>
    </>
  );
}
function AdminRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AdminDash />}>
        <Route index element={<AdminHome />} />
        {/* cateogories */}
        <Route path="categories" element={<Categories />} />
        <Route path="categories/create" element={<CreateCategory />} />
        <Route path="categories/create/offer/:id" element={<CreateOffer />} />
        <Route path="categories/edit/:id" element={<EditCategory />} />
        {/* product */}
        <Route path="product" element={<Products />} />
        <Route path="product/create" element={<AddProducts />} />
        <Route path="product/edit/:id" element={<EditProduct />} />
        {/* users management */}
        <Route path="customers" element={<Customers />} />
        {/* order management */}
        <Route path="orders" element={<Orders />} />
        <Route path="orders/detail/:id" element={<OrderDetailAdmin />} />
        <Route path="orders/return-orders" element={<ReturnOrder />} />
        {/* coupon  management*/}
        <Route path="coupons" element={<Coupons />} />
        <Route path="coupons/create" element={<CreateCoupon />} />
        <Route path="coupons/edit/:id" element={<EditCoupon />} />
      </Route>
    </Routes>
  );
}

export default App;
