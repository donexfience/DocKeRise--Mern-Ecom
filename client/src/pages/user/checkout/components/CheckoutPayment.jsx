import React, { useEffect } from "react";
import GoobglePay from "../../../../assets/GooglePay.jpg";
import RazorPay from "../../../../assets/RazorPay.jpg";
import coddd from "../../../../assets/coddd.svg";
import razorpay from "../../../../assets/razorpay.svg";
import wallet from "../../../../assets/wallet.svg";
import axios from "axios";
import { URL } from "../../../../Common/api";
import { config } from "../../../../Common/configurations";

const CheckoutPayment = ({
  handleSelectPayment,
  selectedPayment,
  walletbalance,
  setWalletBalance,
}) => {
  console.log(selectedPayment, "from sub component");
  useEffect(() => {
    const fetchWalletBalance = async () => {
      const { data } = await axios.get(`${URL}/user/wallet-total`, config);
      setWalletBalance(data.balance);
    };
    fetchWalletBalance();
  },[]);

  return (
    <div>
      <div className="flex items-center justify-center py-5">
        <label
          className="cursor-pointer flex items-center gap-2 flex-col"
          htmlFor="cash"
        >
          <div className="w-16 h-10 mr-2">
            <img
              src={coddd}
              alt="Google Pay"
              className="w-full h-full object-contain"
            />
          </div>
          <span className="text-sm font-bold text-violet-500">
            Cash on Delivery
          </span>
          <input
            type="radio"
            name="paymentMode"
            id="cashOnDelivery"
            value="cashOnDelivery"
            onChange={handleSelectPayment}
            checked={selectedPayment === "cashOnDelivery"}
          />
        </label>
        <label
          className="gap-2 flex-col cursor-pointer flex items-center ml-4"
          htmlFor="cash"
        >
          <div className="w-15 h-10 mr-2">
            <img
              src={razorpay}
              alt="RazorPay"
              className="w-14 h-10 object-contain"
            />
          </div>
          <span className="text-sm font-bold text-violet-500">RazorPay</span>
          <input
            type="radio"
            name="paymentMode"
            id="razorPay"
            value="razorPay"
            onChange={handleSelectPayment}
            checked={selectedPayment === "razorPay"}
          />
        </label>
        <label
          className="gap-2 flex-col cursor-pointer flex items-center ml-4"
          htmlFor="cash"
        >
          <div className="w-15 h-10 mr-2">
            <img
              src={wallet}
              alt="RazorPay"
              className="w-full h-full object-contain"
            />
          </div>
          <span className="text-sm font-bold text-violet-500">My wallet</span>
          <input
            type="radio"
            name="paymentMode"
            id="myWallet"
            value="myWallet"
            onChange={handleSelectPayment}
            checked={selectedPayment === "myWallet"}
          />
        </label>
      </div>
      <div className="bg-blue-300 p-3 text-sm flex items-center justify-center">
        <p className="font-semibold">Your wallet balance : </p>
        <p className="font-bold ml-4">{walletbalance || 0} ₹</p>
      </div>
    </div>
  );
};

export default CheckoutPayment;
