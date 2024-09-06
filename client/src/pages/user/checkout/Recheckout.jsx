import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getRepaymentorder } from "../../../redux/actions/user/orderAction";
import { URL } from "../../../Common/api";
import Loading from "./components/Loading";
import AddressCheckout from "./components/AddressCheckout";
import CheckoutPayment from "./components/CheckoutPayment";
import TotalPrice from "../cart/TotalPrice";
import CheckoutCartRow from "./components/CheckoutCartRow";
import { AiFillCheckCircle } from "react-icons/ai";
import business from "../../../assets/business.svg";
import { removeCoupon } from "../../../redux/actions/user/cartAction";
import toast from "react-hot-toast";
import axios from "axios";
import { config } from "../../../Common/configurations";
const ReCheckout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getRepaymentorder(id));
  }, [id]);

  const { userOrders, loading, error } = useSelector(
    (state) => state.userOrders
  );
  console.log(userOrders, "================");
  //wallet

  const [walletbalance, setWalletBalance] = useState(0);
  // taking the cart details for checkout
  console.log(userOrders.couponCode, "0000000000000");

  //selected address
  const [selectedAddress, setSelectedAddress] = useState("");

  //if any offers
  let offer = 0;
  if (userOrders.couponCode) {
    if (userOrders.couponType === "percentage") {
      offer = ((userOrders.totalPrice * userOrders.discount) / 100).toFixed(0);
    } else {
      offer = Math.round(userOrders.discount);
    }
  }
  console.log(userOrders.totalPrice)
  const finalTotal = userOrders.totalPrice - offer;
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
    if (userOrders.totalPrice > 1000 && selectedPayment === "cashOnDelivery") {
      toast.error("Order above 1000 should not be allowed for COD");
    } else {
      console.log(
        "11111111111111111111111111111111111111111111111111111111111111111"
      );
      setOrderPlaceLoading(true);
      try {
        const order = await axios.post(
          `${URL}/user/Reorder`,
          {
            paymentMode: selectedPayment,
            orderId: id,
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
    console.log(response, "Resssssssssssssssssssssss");
    setOrderPlaceLoading(true);
    try {
      //saving the order
      const orderResponse = await axios.post(
        `${URL}/user/Reorder`,
        {
          paymentMode: selectedPayment,
          orderId: id,
        },
        config
      );

      const { orders } = orderResponse.data;
      console.log(orders, response, "----------order response razor");
      //saving payment
      await axios.post(
        `${URL}/user/razor-verify`,
        { ...response, order: orders._id },
        config
      );
      // Updating user side
      setOrderData(true);
      toast.success("Order Placed");
      setOrderPlaceLoading(false);
      navigateOrderConfirmation(orders);
      dispatch(clearCartOnOrderPlaced());
    } catch (error) {
      console.log(error);
      setOrderPlaceLoading(false);
    }
  };
  console.log(orderData, "-----------------------");
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
  const placeOrder = async () => {
    if (!selectedPayment) {
      toast.error("Please select any payment method");
    }
    //backend calling

    if (
      selectedPayment === "cashOnDelivery" ||
      selectedPayment === "myWallet"
    ) {
      saveOrderOnCashOnDelivery();
    }
    if (selectedPayment === "myWallet") {
      let Total =
        Number(userOrders.totalPrice) +
        Number(userOrders.discount) -
        Number(userOrders.offer) +
        Number(userOrders.tax);
      if (walletbalance < Total) {
        toast.error("insufficient balance in Wallet");
        return;
      }
    }
    if (selectedPayment === "razorPay") {
      initiateRazorPayPayment();
      return;
    }
  };
  // Define a function to simulate payment failure

  useEffect(() => {
    if (orderData) {
      navigate(-1);
    }
  }, [orderData]);
  return (
    <div className="w-full">
      {orderPlaceLoading ? (
        <Loading size={20} />
      ) : (
        <div className="px-5 shadow-md  bg-white">
          <div className="">
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
          </div>
          <div className="lg:w-full bg-white px-5 py-3 border border-gray-200 rounded shrink-0">
            <h1 className="font-bold py-2">Order Summery</h1>
            <div className="py-2"></div>
            <div className="border-b border-gray-200 pb-2 mb-2">
              <div className="cart-total-list flex justify-between">
                <p className="cart-total-list-first font-bold text-violet-500">
                  Sub Total
                </p>
                <p className="cart-total-list-second">
                  {userOrders.subTotal}₹
                </p>
              </div>

              <div className="cart-total-list flex justify-between">
                <p className="cart-total-list-first font-bold text-violet-500">
                  Tax
                </p>
                <p className="cart-total-list-second">
                  {parseInt(userOrders.tax)}₹
                </p>
              </div>

              <div className="cart-total-list flex justify-between">
                <p className="cart-total-list-first font-bold text-violet-500">
                  Shipping
                </p>
                <p className="cart-total-li-second">
                  {userOrders.shipping === 0 ? "Free" : userOrders.shipping}
                </p>
              </div>
              <div className="flex justify-between">
                {/* <p className="text-violet-500 font-bold">Discount</p>
                <p className="cart-total-li-second">
                  {discount}
                  {discount !== ""
                    ? couponType === "percentage"
                      ? `% Off (${offer}₹)`
                      : "₹ Off"
                    : "0₹"}
                </p> */}
              </div>
              {userOrders.couponCode !== "" && (
                <div className="flex items-center p-2 rounded bg-green-100 border border-green-300">
                  <div className="flex items-center justify-center mr-4">
                    <AiFillCheckCircle className="text-green-500" size={24} />
                  </div>
                  <div className="flex flex-col">
                    <p className="text-green-500 font-bold">Coupon applied</p>
                    <p className="text-gray-700">{userOrders.couponCode}</p>
                  </div>
                  <div className="flex ml-auto">
                    <img
                      src={business}
                      alt="Coupon Applied"
                      className="h-12 w-12"
                    />
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
                <p className=" font-bold text-red-400">Total</p>
                <p className="text-red-500 font-semibold">{finalTotal}₹</p>
              </div>
            </div>
            <button
              className="w-full bg-violet-500 text-white rounded-md p-3 hover:bg-red-500"
              onClick={placeOrder}
            >
              Payment Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReCheckout;
