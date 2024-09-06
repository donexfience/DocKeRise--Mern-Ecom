import React, { useEffect, useState } from "react";
import Checkoutradio from "./components/Checkoutradio";
import AddressCheckout from "./components/AddressCheckout";
import Addaddress from "./pages/Addaddress";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loading from "./components/Loading";
import CheckoutPayment from "./components/CheckoutPayment";
import CheckoutCartRow from "./components/CheckoutCartRow";
import TotalPrice from "../cart/TotalPrice";
import axios from "axios";
import { URL } from "../../../Common/api";
import { config } from "../../../Common/configurations";
import toast from "react-hot-toast";
import { GiCleaver } from "react-icons/gi";
import { clearCartOnOrderPlaced } from "../../../redux/reducers/user/cartSlice";
import {
  CheckCouponAvailable,
  CheckProductAvailable,
  removeCoupon,
} from "../../../redux/actions/user/cartAction";

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [couponChecked, setCouponChecked] = useState(false);

  //wallet

  const [walletbalance, setWalletBalance] = useState(0);
  // taking the cart details for checkout

  const { cart, loading, error, cartId } = useSelector((state) => state.cart);
  const {
    totalPrice,
    shipping,
    tax,
    couponType,
    discount,
    couponCode,
    couponValid,
  } = useSelector((state) => state.cart);

  console.log(couponCode, "0000000000000");
  //useEffect for the coupon the validation
  useEffect(() => {
    if (cartId && couponCode && !couponChecked) {
      dispatch(CheckCouponAvailable({ cartId, couponCode })).then((res) => {
        if (!res.payload.valid) {
          dispatch(removeCoupon());
          toast.error("Coupon is not valid.");
        }
        setCouponChecked(true);
      });
    }
  }, [cartId, couponCode, couponChecked, dispatch]);

  console.log(couponValid, "coupon valid");
  //selected address
  const [selectedAddress, setSelectedAddress] = useState("");

  //if any offers
  let offer = 0;
  if (couponCode) {
    if (couponType === "percentage") {
      offer = ((totalPrice * discount) / 100).toFixed(0);
    } else {
      offer = Math.round(discount);
    }
  }
  const finalTotal = totalPrice - offer;

  //
  //handling payment
  const [selectedPayment, setSelectedPayment] = useState(null);
  // console.log(selectedPayment,"selectedpayment state")
  //payment selection

  const handleSelectedPayment = (e) => {
    // console.log(e.target.value,'payment method')
    setSelectedPayment(e.target.value);
  };
  //delievery messages
  const [delieveryMessage, setDelieveyMessage] = useState("");

  //naviagation to confirmation page

  const navigateOrderConfirmation = (order) => {
    if (order) {
      navigate("/order-confirmation", { state: order });
    }
  };
  //order success page switching

  const [orderPlaceLoading, setOrderPlaceLoading] = useState(false);
  const [orderData, setOrderData] = useState(false);

  //cash on delievery saving on backend

  const saveOrderOnCashOnDelivery = async () => {
    if (totalPrice > 1000 && selectedPayment === "cashOnDelivery") {
      toast.error("Order above 1000 should not be allowed for COD");
    } else {
      setOrderPlaceLoading(true);
      try {
        const order = await axios.post(
          `${URL}/user/order`,
          {
            address: selectedAddress,
            paymentMode: selectedPayment,
            notes: delieveryMessage,
            couponCode: couponCode,
          },
          config
        );
        // navigation state
        setOrderData(true);
        toast.success("Order Placed");
        setOrderPlaceLoading(false);
        navigateOrderConfirmation(order.data.order);
        dispatch(clearCartOnOrderPlaced());
      } catch (error) {
        toast.error(error.response?.data?.error);
        setOrderPlaceLoading(false);
      }
    }
  };
  //razorpay order saving in b_end
  const saveOrderRazor = async (response) => {
    console.log(response, "--------------------");
    setOrderPlaceLoading(true);
    try {
      //saving the order
      const orderResponse = await axios.post(
        `${URL}/user/order`,
        {
          notes: delieveryMessage,
          address: selectedAddress,
          paymentMode: selectedPayment,
          couponCode: couponCode,
        },
        config
      );

      const { order } = orderResponse.data;
      console.log(order, response, "----------order response razor");
      //saving payment
      await axios.post(
        `${URL}/user/razor-verify`,
        { ...response, order: order._id },
        config
      );
      // Updating user side
      setOrderData(true);
      toast.success("Order Placed");
      setOrderPlaceLoading(false);
      navigateOrderConfirmation(order);
      dispatch(clearCartOnOrderPlaced());
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.error || "something went wrong");
      setOrderPlaceLoading(false);
    }
  };
  //making razor pay payment window
  const initiateRazorPayPayment = async () => {
    console.log("calling razor pay function");
    //getting razor-pay secret key
    const {
      data: { key },
    } = await axios.get(`${URL}/user/razor-key`, config);

    //creating razor pay order

    const {
      data: { order },
    } = await axios.post(
      `${URL}/user/razor-order`,
      { amount: parseInt(finalTotal) },
      config
    );

    //razor pay configurations
    let options = {
      key: key,
      amount: parseInt(finalTotal) * 1000,
      currency: "INR",
      name: "GamersLoot",
      description: "Test Transaction",
      image: `https://res.cloudinary.com/dkkzzswnv/image/upload/v1714384040/Gamersloot/Logo/hdmtvxie1idk1lpdxdgb.png`,
      order_id: order.id,
      handler: function (response) {
        saveOrderRazor(response);
      },
      prefill: {
        name: "Gaurav Kumar",
        email: "gaurav.kumar@example.com",
        contact: "9000090000",
      },
      notes: {
        address: "Razor pay Corporate Office",
      },
      theme: {
        color: "#2b2b30",
      },
    };

    const razor = new window.Razorpay(options);
    razor.open();

    // If failed toast it.
    razor.on("payment.failed", async function (response) {
      console.log(response);
      try {
        const newOrder = await axios.post(
          `${URL}/user/faildorder`,
          {
            address: selectedAddress,
            paymentMode: selectedPayment,
            notes: delieveryMessage,
            couponCode: couponCode,
          },
          config
        );
        toast.error("Payment failed Order created with payment status Failed");
        navigate("/cart");
        dispatch(clearCartOnOrderPlaced());
      } catch (error) {
        toast.error(error.response?.data?.error || "something went wrong");
      }
      setOrderPlaceLoading(false);
      // toast.error(response.error.code);
      // toast.error(response.error.description);
      // toast.error(response.error.source);
      // toast.error(response.error.step);
      // toast.error(response.error.reason);
      // toast.error(response.error.metadata.order_id);
      // toast.error(response.error.metadata.payment_id);
    });
  };

  //order placing function

  const placeOrder = async () => {
    // Validate cart
    dispatch(CheckProductAvailable(cartId)).then((res) => {
      if (res.payload.available) {
        console.log("hello inside the place Order");
        if (cart.length === 0) {
          toast.error("Add something to the cart");
          return;
        }
        if (!selectedAddress) {
          toast.error("Delivery address not found");
          return;
        }
        if (!selectedPayment) {
          toast.error("Please select a payment method");
          return;
        }
        if (
          (selectedPayment === "cashOnDelivery" && selectedAddress) ||
          (selectedPayment === "myWallet " && selectedAddress)
        ) {
          saveOrderOnCashOnDelivery();
        }
        if (selectedPayment === "myWallet" && selectedAddress) {
          let Total =
            Number(totalPrice) + Number(discount) - Number(offer) + Number(tax);
          if (walletbalance < Total) {
            toast.error("Insufficient balance in Wallet");
            return;
          }
        }
        if (selectedPayment === "razorPay" && selectedAddress) {
          initiateRazorPayPayment();
          return;
        }
      } else {
        toast.error("product not available");
      }
    });
  };

  useEffect(() => {
    if (orderData) {
      navigate(-1);
    }
  }, [orderData]);
  return (
    <>
      {orderPlaceLoading ? (
        <Loading size={20} />
      ) : (
        <div className="pt-20 px-5 lg:p-20 shadow-md lg:flex  items-start gap-5 bg-gray-100">
          <div className="w-3/4">
            <AddressCheckout
              selectedAddress={selectedAddress}
              setSelectedAddress={setSelectedAddress}
            />
            <div className="bg-white my-5 p-5 w-full shadow-md">
              <h1 className="font-bold">Payment Options</h1>
              <div className="border border-violet-500 px-5 mt-2"></div>
              <CheckoutPayment
                handleSelectPayment={handleSelectedPayment}
                selectedPayment={selectedPayment}
                walletbalance={walletbalance}
                setWalletBalance={setWalletBalance}
              />
            </div>
            <div className="bg-white my-3 p-5 w-full shadow-md">
              <p className="mu-1 font-bold ">Delivery Messages</p>
              <div className="border border-violet-500 px-5 mt-2"></div>

              <textarea
                placeholder="Notes about your order e.g. special notes for delivery"
                className="w-full h-40 px-3 py-2 outline-none rounded resize-none"
                value={delieveryMessage}
                onChange={(e) => {
                  setDelieveyMessage(e.target.value);
                }}
              ></textarea>
            </div>
          </div>
          <div className="lg:w-1/4 bg-white px-5 py-3 border border-gray-200 rounded shrink-0">
            <h1 className="font-bold py-2">Order Summery</h1>
            <div className="py-2">
              {cart &&
                cart.map((item, index) => (
                  <CheckoutCartRow item={item} key={index} />
                ))}
            </div>
            <TotalPrice />
            <button
              className="w-full bg-violet-500 text-white rounded-md p-3 hover:bg-red-500"
              onClick={placeOrder}
            >
              Place Order
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Checkout;
