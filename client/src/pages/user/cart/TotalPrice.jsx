import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { calculateTotalPrice } from "../../../redux/reducers/user/cartSlice";
import { removeCoupon } from "../../../redux/actions/user/cartAction";
import { AiFillCheckCircle } from "react-icons/ai";
import business from "../../../assets/business.svg";

const TotalPrice = () => {
  const { totalPrice, shipping, discount, tax, couponType, couponCode } =
    useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(calculateTotalPrice());
  }, [dispatch]);

  let offer = 0;
  if (couponType === "percentage") {
    offer = ((totalPrice * discount) / 100).toFixed(0);
  } else {
    offer = Math.round(discount);
  }

  const finalprice = totalPrice - offer;

  return (
    <div className="border-b border-gray-200 pb-2 mb-2">
      <div className="cart-total-list flex justify-between">
        <p className="cart-total-list-first font-bold text-violet-500">
          Sub Total
        </p>
        <p className="cart-total-list-second">
          {totalPrice - shipping - parseInt(tax)}₹
        </p>
      </div>

      <div className="cart-total-list flex justify-between">
        <p className="cart-total-list-first font-bold text-violet-500">Tax</p>
        <p className="cart-total-list-second">{parseInt(tax)}₹</p>
      </div>

      <div className="cart-total-list flex justify-between">
        <p className="cart-total-list-first font-bold text-violet-500">
          Shipping
        </p>
        <p className="cart-total-li-second">
          {shipping === 0 ? "Free" : shipping}
        </p>
      </div>

      <div className="flex justify-between">
        <p className="text-violet-500 font-bold">Discount</p>
        <p className="cart-total-li-second">
          {discount}
          {discount !== ""
            ? couponType === "percentage"
              ? `% Off (${offer}₹)`
              : "₹ Off"
            : "0₹"}
        </p>
      </div>

      {couponCode !== "" && (
        <div className="flex items-center p-2 rounded bg-green-100 border border-green-300">
          <div className="flex items-center justify-center mr-4">
            <AiFillCheckCircle className="text-green-500" size={24} />
          </div>
          <div className="flex flex-col">
            <p className="text-green-500 font-bold">Coupon applied</p>
            <p className="text-gray-700">{couponCode}</p>
          </div>
          <div className="flex ml-auto">
            <img src={business} alt="Coupon Applied" className="h-12 w-12" />
          </div>
          <button
            onClick={() => dispatch(removeCoupon())}
            className="flex items-center bg-red-500 text-white p-2 rounded-md ml-4"
          >
            Remove Coupon
          </button>
        </div>
      )}

      <div className="cart-total-list flex justify-between">
        <p className="font-bold text-red-400">Total</p>
        <p className="font-semibold text-red-500">{finalprice}₹</p>
      </div>
    </div>
  );
};

export default TotalPrice;
