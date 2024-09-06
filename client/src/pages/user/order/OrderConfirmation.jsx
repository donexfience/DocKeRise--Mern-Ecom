import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AiFillGift } from "react-icons/ai";
import date from "date-and-time";
import { BsArrowRight } from "react-icons/bs";
import { useLocation } from "react-router-dom";
import GamersLootLogo from "../../../components/GamersLootLogo";
import Deliverys from '../../../assets/Deliverys.mp4'

const OrderConfirmation = () => {
  const location = useLocation();
  const orderData = location.state;
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Triggering the box opening animation after a brief delay
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-white py-5 pt-6  h-106 flex flex-col items-center justify-center">
      <div className="bg-white p-8 rounded-lg text-center shadow-lg">
        <div className="mb-6">
          <div className="flex justify-center text-5xl text-yellow-500 mb-4">
            <AiFillGift
              className={`transform ${isOpen ? "rotate-45" : ""}`} // Applying rotation when the box is open
              style={{ transition: "transform 0.5s ease" }} // Adding transition effect
            />
          </div>
          <div className="flex justify-center mb-4">
            {/* Video player to play the confirmation video */}
            {isOpen && (
              <video autoPlay loop muted className="w-full max-w-lg">
                <source src={Deliverys} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
          </div>
          <h2 className="text-3xl font-semibold text-green-600 mb-2">
            Order Confirmed!
          </h2>
          <p className="text-gray-700">
            Thank you for Shopping with Us. Your order has been successfully
            placed. Kindly wait for the further delivery updates
          </p>
        </div>
        <div className="mb-8">
          <div className="py-3 border-b">
            <h3 className="text-lg font-semibold mb-2">Order Details</h3>
            <p className="text-violet-600 font-bold">
              Order ID: {orderData.orderId}
            </p>
            <p>Order Total: {orderData.totalPrice}</p>
            <p>
              <Link
                to={`/dashboard/order-history/detail/${
                  orderData.orderId || orderData._id
                }`}
                className="flex items-center justify-center gap-2 text-sm py-2 text-blue-500 hover:underline"
              >
                View Details <BsArrowRight />
              </Link>
            </p>
          </div>
          <h1 className="text-lg font-semibold my-2">Expected Delivery Date</h1>
          <p>{date.format(new Date(orderData.deliveryDate), "MMM DD YYYY")}</p>
        </div>
        <Link to="/" className="text-blue-500 text-lg font-semibold  hover:underline">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default OrderConfirmation;
