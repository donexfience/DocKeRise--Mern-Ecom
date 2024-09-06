import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  CheckProductAvailable,
  applyCoupon,
  deleteEntireCart,
  deleteOneProduct,
  getCart,
} from "../../../redux/actions/user/cartAction";
import ConfirmModal from "../../../components/ConfirmModal";
import JustLoading from "../../../components/JustLoading";
import BreadCrumbs from "../../admin/components/BreadCrumbs";
import CartProductRow from "../../../components/CartProductRow";
import CartEmpty from "../../../assets/CartEmpty.jpg";
import TotalPrice from "./TotalPrice";
import { AiOutlineDelete } from "react-icons/ai";
import toast from "react-hot-toast";
import { FaSearch } from "react-icons/fa";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cart, loading, cartId } = useSelector((state) => state.cart);
  const [productId, setProductId] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [showSingleConfirm, setShowSingleConfirm] = useState(false);

  //coupon config

  const [inputCouponCode, setInputCouponCode] = useState("");
  const dispatchApplyCoupons = () => {
    if (inputCouponCode.trim() !== "") {
      dispatch(applyCoupon(inputCouponCode.trim()));
    }
  };
  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

  const deleteCart = () => {
    toggleConfirm();
    dispatch(deleteEntireCart(cartId));
  };

  const deletingsingleProduct = () => {
    dispatch(deleteOneProduct({ cartId, productId }))
      .then(() => {
        // After successfully deleting the product, fetch the updated cart data
        dispatch(getCart());
      })
      .catch((error) => {
        // Handle any errors, if necessary
        console.error("Error deleting product:", error);
      });
    toggleSingleConfirm("");
  };

  const toggleConfirm = () => {
    if (cart.length > 0) {
      setShowConfirm(!showConfirm);
    } else {
      toast.error("Nothing in the Cart");
    }
  };

  const toggleSingleConfirm = (id) => {
    setProductId(id);
    setShowSingleConfirm(!showSingleConfirm);
  };

  return (
    <div className="">
      <div className="bg-gray-100 flex lg:flex-row flex-col gap-5 lg:px-28 px-5 py-20 min-h-screen">
        <div className="lg:w-2/3 bg-white border border-gray-200 shadow-lg ">
          <BreadCrumbs list={["Home", "Cart"]} />

          <div className="mb-4 bg-white  p-4 flex items-center justify-between">
            <h2 className="text-violet-500 font-bold text-lg ">Product Cart</h2>
            <div className="">
              <button
                className="bg-violet-600 p-3 text-white rounded-md flex items-center gap-3 font-semibold"
                onClick={toggleConfirm}
              >
                Delete Cart <AiOutlineDelete />
              </button>
            </div>
          </div>
          {showConfirm && (
            <ConfirmModal
              title="Confirm deleting the cart ?"
              positiveAction={deleteCart}
              negativeAction={() => toggleConfirm("")}
            />
          )}
          {showSingleConfirm && (
            <ConfirmModal
              title="Confirm delete ? "
              negativeAction={() => toggleSingleConfirm("")}
              positiveAction={deletingsingleProduct}
            />
          )}
          {loading ? (
            <div className="flex items-center bg-gray-100 shadow-lg justify-center h-full">
              <JustLoading size={20} />
            </div>
          ) : cart.length > 0 ? (
            <div className="overflow-x-auto bg-white">
              <table className="min-w-full">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left font-bold text-lg text-violet-500">
                      Products
                    </th>
                    <th className="px-13 py-3 text-left font-bold text-lg text-violet-500">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left font-bold text-lg text-violet-500">
                      Quantity
                    </th>
                    <th className="px-12 py-3 text-left font-bold text-lg text-violet-500 ">
                      Total
                    </th>
                    <th className="px-6 py-3 text-left font-bold text-lg text-violet-500"></th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item, index) => (
                    <CartProductRow
                      key={index}
                      item={item}
                      isLast={index === cart.length - 1}
                      toggleProductConfirm={toggleSingleConfirm}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="flex items-center justify-center h-screen">
              <div className="flex flex-col items-center">
                <img
                  src={CartEmpty}
                  alt="Empty Cart Icon"
                  className="w-full lg:w-1/2"
                />
                <p className="text-gray-500 mt-4 text-lg font-bold">
                  Your cart is empty
                </p>
                <Link
                  to="/"
                  className="py-2 text-blue-500 hover:underline text-lg font-semibold "
                >
                  Go back to shopping
                </Link>
              </div>
            </div>
          )}
        </div>
        <div className="lg:w-1/3">
          <div>
            <div className="bg-white border p-5 shadow-lg ">
              <h3 className="font-bold text-violet-500">Cart Total</h3>
              <TotalPrice />
              <button
                className="bg-violet-600 w-full p-3  text-white font-bold rounded-md"
                onClick={() => {
                  console.log(
                    cartId,
                    "1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111"
                  );
                  dispatch(CheckProductAvailable(cartId)).then((res) => {
                    if (res.payload.available && cart.length > 0) {
                      navigate("/checkout");
                      console.log(res, "==========");
                    } else {
                      console.log(res);
                      toast.error("product not available for going to checkout");
                    }
                  });
                }}
              >
                Procced to Checkout
              </button>
            </div>
            <div className="mt-8 bg-white">
              <h3 className="p-5 border-b border-gray-100 font-bold">
                Coupon code
              </h3>
              <div className="p-4">
                <input
                  type="text"
                  className="w-full bg-gray-100 py-2 px-2 border border-gray-300"
                  placeholder="Enter your coupon code"
                  value={inputCouponCode}
                  onChange={(e) => setInputCouponCode(e.target.value)}
                />
                <div className="pt-3 flex justify-between">
                  <button
                    className="bg-violet-500 border border-black text-white rounded-md p-3"
                    onClick={dispatchApplyCoupons}
                  >
                    Apply Coupon
                  </button>
                  <button
                    className="flex items-center gap-2 border-2 px-2"
                    onClick={() => navigate("/dashboard/coupons-search")}
                  >
                    <FaSearch /> find coupon
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
